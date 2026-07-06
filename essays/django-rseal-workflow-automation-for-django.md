---
layout: essay
type: essay
title: "Django-RSeal: Workflow Automation for Django"
date: 2025-04-19
published: true
labels:
  - Python
  - Django
  - Workflows
  - Architecture
---

<img width="80px" class="rounded float-left pe-4" src="https://static.djangoproject.com/img/logos/django-logo-negative.svg" alt="Django-RSeal logo" onerror="this.src='../img/essay/django.jpg'">

## Introduction

Complex business operations do not belong in Django views. A view that processes an order — validating state, charging payment, updating inventory, sending notifications, and writing an audit trail — is not a view. It is a workflow masquerading as a view, and it is untestable, unreusable, and fragile.

RSeal gives you a workflow layer that makes multi-step operations testable, observable, and maintainable. It replaces tangled view logic with composable `Operation` classes chained into `Workflow` sequences — each step isolated, each failure handled, each compensation action defined. The result is business logic that can be tested without HTTP, reused across views and background jobs, and observed through structured audit trails.

## Key Benefits

| Feature | RSeal Workflows | Django Views | Celery Tasks |
|---------|----------------|--------------|--------------|
| Step isolation | ✅ Per-operation | ❌ Monolithic | ⚠️ Per-task |
| Compensation actions | ✅ Built-in `on_failure` | ❌ Manual | ❌ Manual |
| Parallel operations | ✅ `ParallelOperation` | ❌ Manual | ⚠️ `group()` |
| Conditional steps | ✅ `ConditionalOperation` | ❌ Manual | ❌ Manual |
| Retry logic | ✅ `RetryOperation` | ❌ Manual | ✅ Built-in |
| Transactional wrapping | ✅ `TransactionalWorkflow` | ⚠️ Manual | ❌ None |
| Testability | ✅ No HTTP required | ❌ Test client needed | ⚠️ Celery worker |
| Audit trail | ✅ Structured context | ❌ Manual | ❌ Manual |
| Service layer | ✅ Organized by domain | ❌ None | ❌ None |

```bash
pip install django-rseal
```

## The Problem It Solves

Complex Django views mix validation, payment, inventory, notifications, and logging in one function — impossible to test or reuse:

```python
# Before: 60-line view doing everything
def process_order(request, order_id):
    order = Order.objects.get(pk=order_id)
    if not order.can_be_processed():
        ...
    payment_result = payment_gateway.charge(order.total)
    if not payment_result.success:
        ...
    for item in order.items.all():
        product.stock -= item.quantity
        product.save()
    send_order_confirmation(order)
    order.status = 'processed'
    order.save()
    AuditLog.objects.create(...)
```

## Core Concepts

### Operations — Single Units of Work

```python
from rseal.core import Operation

class ValidateOrderOperation(Operation):
    def __init__(self, order_id):
        self.order_id = order_id

    def execute(self, context):
        order = Order.objects.get(pk=self.order_id)
        if not order.can_be_processed():
            return self.fail(
                code="ORDER_INVALID_STATE",
                message="Order cannot be processed"
            )
        context['order'] = order
        return self.success()

class ProcessPaymentOperation(Operation):
    def execute(self, context):
        order = context['order']
        result = payment_gateway.charge(order.total)
        if result.success:
            context['payment_id'] = result.id
            return self.success()
        return self.fail(code="PAYMENT_FAILED", message="Payment failed")
```

### Workflows — Sequences of Operations

```python
from rseal.core import Workflow

class ProcessOrderWorkflow(Workflow):
    def __init__(self, order_id, user_id):
        self.order_id = order_id
        self.user_id = user_id

    def define_operations(self):
        return [
            ValidateOrderOperation(self.order_id),
            ProcessPaymentOperation(self.order_id),
            UpdateInventoryOperation(self.order_id),
            SendNotificationsOperation(self.order_id),
            UpdateOrderStatusOperation(self.order_id, 'completed'),
            LogAuditTrailOperation(self.user_id, 'process_order', self.order_id),
        ]

    def on_failure(self, failed_op, error, context):
        # Compensating actions
        if 'payment_id' in context:
            payment_gateway.refund(context['payment_id'])
```

### Using Workflows in Components

```python
from django_osoul.site.routes import FragmentComponent

class ProcessOrderComponent(FragmentComponent):
    route_name = "process-order"
    fragment_template = "orders/process.html"

    def post(self, request, order_id):
        workflow = ProcessOrderWorkflow(
            order_id=order_id,
            user_id=request.user.id
        )
        result = workflow.execute()

        if result.success:
            messages.success(request, "Order processed successfully")
            return self.redirect('orders:detail', order_id)

        error = result.errors[0]
        messages.error(request, error.message)
        return self.render_fragment(error_code=error.code)
```

## Advanced Patterns

### Parallel Operations

```python
from rseal.core import ParallelOperation

class SendNotificationsOperation(ParallelOperation):
    def define_parallel_operations(self):
        return [
            SendEmailNotificationOperation(self.order_id),
            SendSMSNotificationOperation(self.order_id),
            SendPushNotificationOperation(self.order_id),
        ]
```

### Conditional Operations

```python
from rseal.core import ConditionalOperation

class SendShippingNotificationOperation(ConditionalOperation):
    def should_execute(self, context):
        order = context['order']
        return any(item.is_physical for item in order.items)

    def execute(self, context):
        tracking = shipping_service.create_shipment(context['order'])
        context['tracking_number'] = tracking
        return self.success()
```

### Retry Operations

```python
from rseal.core import RetryOperation

class ProcessPaymentWithRetryOperation(RetryOperation):
    def __init__(self, order_id):
        super().__init__(max_retries=3, retry_delay=5, retry_backoff=True)
        self.order_id = order_id

    def operation_factory(self):
        return ProcessPaymentOperation(self.order_id)
```

### Transactional Workflows

```python
from django.db import transaction
from rseal.core import TransactionalWorkflow

class ProcessOrderTransactionalWorkflow(TransactionalWorkflow):
    @transaction.atomic
    def execute(self):
        return super().execute()

    def define_operations(self):
        return [
            ValidateOrderOperation(self.order_id),
            ProcessPaymentOperation(self.order_id),
            UpdateInventoryOperation(self.order_id),
            # Any failure rolls back the entire transaction
        ]
```

## Service Layer Integration

RSeal also organizes services into categories:

```
services/
├── email/           # EmailService, EmailQueueManager, CSVParser
├── communication/   # InvitationService, send_confirmation_email
├── commerce/        # PayPalGateway, StripeGateway, CertificateService
├── content/         # SearchService, FormSubmissionService
└── infrastructure/  # BaseService, TokenService, dispatch_job
```

```python
# New nested imports
from django_rseal.services.email.email_service import EmailService
from django_rseal.services.communication.invitation_service import InvitationService
from django_rseal.services.commerce.stripe_gateway import StripeGateway
```

## Use Cases

- Order processing with payment, inventory, and notifications
- User onboarding flows
- Complex multi-step business operations
- Background job orchestration
- Audit-trail-required workflows

## Conclusion

Business logic that lives in Django views is business logic that cannot be tested, reused, or observed in isolation. Every multi-step operation embedded in a view is a liability: untestable without HTTP, unreusable across contexts, and fragile when any step fails.

RSeal transforms this pattern. Operations are isolated, testable units. Workflows compose them into sequences with defined failure handling and compensation actions. Parallel and conditional operations eliminate the need for manual orchestration. The service layer organizes domain logic into discoverable, reusable modules.

Teams that adopt RSeal ship complex business operations with confidence — because every step is tested independently, every failure is handled explicitly, and every workflow is observable from end to end.

👉 Read more on [Medium](https://medium.com/@mammhoud/rseal-workflow-automation)

## References

- [Django-RSeal GitHub](https://github.com/mammhoud/django-rseal) - Official repository
- [Django Documentation](https://docs.djangoproject.com/) - Django framework
- [Stripe Documentation](https://stripe.com/docs) - Payment processing
