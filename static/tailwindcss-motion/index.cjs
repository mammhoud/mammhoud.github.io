'use strict';

var createPlugin = require('tailwindcss/plugin.js');
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var createPlugin__default = /*#__PURE__*/_interopDefault(createPlugin);
var flattenColorPalette__default = /*#__PURE__*/_interopDefault(flattenColorPalette);

// src/index.ts
var allEnterAnimations = "var(--motion-scale-in-animation), var(--motion-translate-in-animation), var(--motion-rotate-in-animation), var(--motion-filter-in-animation), var(--motion-opacity-in-animation), var(--motion-background-color-in-animation), var(--motion-text-color-in-animation)";
var allExitAnimations = "var(--motion-scale-out-animation), var(--motion-translate-out-animation), var(--motion-rotate-out-animation), var(--motion-filter-out-animation), var(--motion-opacity-out-animation), var(--motion-background-color-out-animation), var(--motion-text-color-out-animation)";
var allLoopAnimations = "var(--motion-scale-loop-animation), var(--motion-translate-loop-animation), var(--motion-rotate-loop-animation), var(--motion-filter-loop-animation), var(--motion-opacity-loop-animation), var(--motion-background-color-loop-animation), var(--motion-text-color-loop-animation)";
var allLoopAndEnterAnimations = `${allEnterAnimations}, ${allLoopAnimations}`;
var scaleInAnimation = "motion-scale-in calc(var(--motion-scale-duration, var(--motion-duration)) * var(--motion-scale-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-scale-timing, var(--motion-timing)) var(--motion-scale-delay, var(--motion-delay)) both";
var scaleOutAnimation = "motion-scale-out calc(var(--motion-scale-duration, var(--motion-duration)) * var(--motion-scale-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-scale-timing, var(--motion-timing)) var(--motion-scale-delay, var(--motion-delay)) both";
var scaleLoopAnimation = (type) => `motion-scale-loop-${type} calc(var(--motion-scale-duration, var(--motion-duration)) * var(--motion-scale-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-scale-timing, var(--motion-timing)) var(--motion-scale-delay, var(--motion-delay)) both var(--motion-scale-loop-count, var(--motion-loop-count))`;
var translateInAnimation = "motion-translate-in calc(var(--motion-translate-duration, var(--motion-duration)) * var(--motion-translate-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-translate-timing, var(--motion-timing)) var(--motion-translate-delay, var(--motion-delay)) both";
var translateOutAnimation = "motion-translate-out calc(var(--motion-translate-duration, var(--motion-duration)) * var(--motion-translate-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-translate-timing, var(--motion-timing)) var(--motion-translate-delay, var(--motion-delay)) both";
var translateLoopAnimation = (type) => `motion-translate-loop-${type} calc(var(--motion-translate-duration, var(--motion-duration)) * var(--motion-translate-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-translate-timing, var(--motion-timing)) var(--motion-translate-delay, var(--motion-delay)) both var(--motion-translate-loop-count, var(--motion-loop-count))`;
var rotateInAnimation = "motion-rotate-in calc(var(--motion-rotate-duration, var(--motion-duration)) * var(--motion-rotate-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-rotate-timing, var(--motion-timing)) var(--motion-rotate-delay, var(--motion-delay)) both";
var rotateOutAnimation = "motion-rotate-out calc(var(--motion-rotate-duration, var(--motion-duration)) * var(--motion-rotate-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-rotate-timing, var(--motion-timing)) var(--motion-rotate-delay, var(--motion-delay)) both";
var rotateLoopAnimation = (type) => `motion-rotate-loop-${type} calc(var(--motion-rotate-duration, var(--motion-duration)) * var(--motion-rotate-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-rotate-timing, var(--motion-timing)) var(--motion-rotate-delay, var(--motion-delay)) both var(--motion-rotate-loop-count, var(--motion-loop-count))`;
var filterInAnimation = "motion-filter-in calc(var(--motion-filter-duration, var(--motion-duration)) * var(--motion-filter-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-filter-timing, var(--motion-timing)) var(--motion-filter-delay, var(--motion-delay)) both";
var filterOutAnimation = "motion-filter-out calc(var(--motion-filter-duration, var(--motion-duration)) * var(--motion-filter-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-filter-timing, var(--motion-timing)) var(--motion-filter-delay, var(--motion-delay)) both";
var filterLoopAnimation = (type) => `motion-filter-loop-${type} calc(var(--motion-filter-duration, var(--motion-duration)) * var(--motion-filter-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-filter-timing, var(--motion-timing)) var(--motion-filter-delay, var(--motion-delay)) both var(--motion-filter-loop-count, var(--motion-loop-count))`;
var opacityInAnimation = "motion-opacity-in calc(var(--motion-opacity-duration, var(--motion-duration)) * var(--motion-opacity-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-opacity-timing, var(--motion-timing)) var(--motion-opacity-delay, var(--motion-delay)) both";
var opacityOutAnimation = "motion-opacity-out calc(var(--motion-opacity-duration, var(--motion-duration)) * var(--motion-opacity-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-opacity-timing, var(--motion-timing)) var(--motion-opacity-delay, var(--motion-delay)) both";
var opacityLoopAnimation = (type) => `motion-opacity-loop-${type} calc(var(--motion-opacity-duration, var(--motion-duration)) * var(--motion-opacity-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-opacity-timing, var(--motion-timing)) var(--motion-opacity-delay, var(--motion-delay)) both var(--motion-opacity-loop-count, var(--motion-loop-count))`;
var backgroundColorInAnimation = "motion-background-color-in calc(var(--motion-background-color-duration, var(--motion-duration)) * var(--motion-background-color-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-background-color-timing, var(--motion-timing)) var(--motion-background-color-delay, var(--motion-delay)) both";
var backgroundColorOutAnimation = "motion-background-color-out calc(var(--motion-background-color-duration, var(--motion-duration)) * var(--motion-background-color-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-background-color-timing, var(--motion-timing)) var(--motion-background-color-delay, var(--motion-delay)) both";
var backgroundColorLoopAnimation = (type) => `motion-background-color-loop-${type} calc(var(--motion-background-color-duration, var(--motion-duration)) * var(--motion-background-color-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-background-color-timing, var(--motion-timing)) var(--motion-background-color-delay, var(--motion-delay)) both var(--motion-background-color-loop-count, var(--motion-loop-count))`;
var textColorInAnimation = "motion-text-color-in calc(var(--motion-text-color-duration, var(--motion-duration)) * var(--motion-text-color-perceptual-duration-multiplier, var(--motion-perceptual-duration-multiplier))) var(--motion-text-color-timing, var(--motion-timing)) var(--motion-text-color-delay, var(--motion-delay)) both";
var textColorOutAnimation = "motion-text-color-out calc(var(--motion-text-color-duration, --motion-duration) * var(--motion-text-color-perceptual-duration-multiplier, --motion-perceptual-duration-multiplier)) var(--motion-text-color-timing, --motion-timing) var(--motion-text-color-delay, --motion-delay) both";
var textColorLoopAnimation = (type) => `motion-text-color-loop-${type} calc(var(--motion-text-color-duration, --motion-duration) * var(--motion-text-color-perceptual-duration-multiplier, --motion-perceptual-duration-multiplier)) var(--motion-text-color-timing, --motion-timing) var(--motion-text-color-delay, --motion-delay) both var(--motion-text-color-loop-count, --motion-loop-count)`;
function addBaseAnimations(matchUtilities, theme) {
  matchUtilities(
    {
      "motion-scale-in": (value) => ({
        "--motion-origin-scale-x": value,
        "--motion-origin-scale-y": value,
        "--motion-scale-in-animation": scaleInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-scale-x-in": (value) => ({
        "--motion-origin-scale-x": value,
        "--motion-scale-in-animation": scaleInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-scale-y-in": (value) => ({
        "--motion-origin-scale-y": value,
        "--motion-scale-in-animation": scaleInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-scale-out": (value) => ({
        "--motion-end-scale-x": value,
        "--motion-end-scale-y": value,
        "--motion-scale-out-animation": scaleOutAnimation,
        animation: allExitAnimations
      }),
      "motion-scale-x-out": (value) => ({
        "--motion-end-scale-x": value,
        "--motion-scale-out-animation": scaleOutAnimation,
        animation: allExitAnimations
      }),
      "motion-scale-y-out": (value) => ({
        "--motion-end-scale-y": value,
        "--motion-scale-out-animation": scaleOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionScale")
    }
  );
  matchUtilities(
    {
      "motion-scale-x-loop": (value, { modifier }) => ({
        "--motion-loop-scale-x": value,
        "--motion-scale-loop-animation": scaleLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      }),
      "motion-scale-y-loop": (value, { modifier }) => ({
        "--motion-loop-scale-y": value,
        "--motion-scale-loop-animation": scaleLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      }),
      "motion-scale-loop": (value, { modifier }) => ({
        "--motion-loop-scale-x": value,
        "--motion-loop-scale-y": value,
        "--motion-scale-loop-animation": scaleLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      })
    },
    {
      values: theme("motionScale"),
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
  matchUtilities(
    {
      "motion-translate-x-in": (value) => ({
        "--motion-origin-translate-x": value,
        "--motion-translate-in-animation": translateInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-translate-y-in": (value) => ({
        "--motion-origin-translate-y": value,
        "--motion-translate-in-animation": translateInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-translate-x-out": (value) => ({
        "--motion-end-translate-x": value,
        "--motion-translate-out-animation": translateOutAnimation,
        animation: allExitAnimations
      }),
      "motion-translate-y-out": (value) => ({
        "--motion-end-translate-y": value,
        "--motion-translate-out-animation": translateOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionTranslate"),
      supportsNegativeValues: true
    }
  );
  matchUtilities(
    {
      "motion-translate-x-loop": (value, { modifier }) => {
        return {
          "--motion-loop-translate-x": value,
          "--motion-translate-loop-animation": translateLoopAnimation(
            modifier || "mirror"
          ),
          animationComposition: "accumulate",
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-translate-y-loop": (value, { modifier }) => {
        return {
          "--motion-loop-translate-y": value,
          "--motion-translate-loop-animation": translateLoopAnimation(
            modifier || "mirror"
          ),
          animationComposition: "accumulate",
          animation: allLoopAndEnterAnimations
        };
      }
    },
    {
      values: theme("motionTranslate"),
      supportsNegativeValues: true,
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
  matchUtilities(
    {
      "motion-rotate-in": (value) => ({
        "--motion-origin-rotate": value,
        "--motion-rotate-in-animation": rotateInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-rotate-out": (value) => ({
        "--motion-end-rotate": value,
        "--motion-rotate-out-animation": rotateOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionRotate"),
      supportsNegativeValues: true
    }
  );
  matchUtilities(
    {
      "motion-rotate-loop": (value, { modifier }) => ({
        "--motion-loop-rotate": value,
        "--motion-rotate-loop-animation": rotateLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      })
    },
    {
      values: theme("motionRotate"),
      supportsNegativeValues: true,
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
  matchUtilities(
    {
      "motion-blur-in": (value) => ({
        "--motion-origin-blur": value,
        "--motion-filter-in-animation": filterInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-blur-out": (value) => ({
        "--motion-end-blur": value,
        "--motion-filter-out-animation": filterOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionBlur")
    }
  );
  matchUtilities(
    {
      "motion-blur-loop": (value, { modifier }) => ({
        "--motion-loop-blur": value,
        "--motion-filter-loop-animation": filterLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      })
    },
    {
      values: theme("motionBlur"),
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
  matchUtilities(
    {
      "motion-grayscale-in": (value) => ({
        "--motion-origin-grayscale": value,
        "--motion-filter-in-animation": filterInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-grayscale-out": (value) => ({
        "--motion-end-grayscale": value,
        "--motion-filter-out-animation": filterOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionGrayscale")
    }
  );
  matchUtilities(
    {
      "motion-grayscale-loop": (value, { modifier }) => ({
        "--motion-loop-grayscale": value,
        "--motion-filter-loop-animation": filterLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      })
    },
    {
      values: theme("motionGrayscale"),
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
  matchUtilities(
    {
      "motion-opacity-in": (value) => ({
        "--motion-origin-opacity": value,
        "--motion-opacity-in-animation": opacityInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-opacity-out": (value) => ({
        "--motion-end-opacity": value,
        "--motion-opacity-out-animation": opacityOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionOpacity")
    }
  );
  matchUtilities(
    {
      "motion-opacity-loop": (value, { modifier }) => ({
        // we need to subtract 1 because of animation composition
        "--motion-loop-opacity": `calc(${value} - 1)`,
        "--motion-opacity-loop-animation": opacityLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      })
    },
    {
      values: theme("motionOpacity"),
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
  matchUtilities(
    {
      "motion-bg-in": (value) => ({
        "--motion-origin-background-color": value,
        "--motion-background-color-in-animation": backgroundColorInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-bg-out": (value) => ({
        "--motion-end-background-color": value,
        "--motion-background-color-out-animation": backgroundColorOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionBackgroundColor"),
      type: "color"
    }
  );
  matchUtilities(
    {
      "motion-bg-loop": (value, { modifier }) => ({
        "--motion-loop-background-color": value,
        "--motion-background-color-loop-animation": backgroundColorLoopAnimation(modifier || "mirror"),
        // no animation composition because it makes colors add
        animation: allLoopAndEnterAnimations
      })
    },
    {
      values: theme("motionBackgroundColor"),
      type: "color",
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
  matchUtilities(
    {
      "motion-text-in": (value) => ({
        "--motion-origin-text-color": value,
        "--motion-text-color-in-animation": textColorInAnimation,
        animation: allLoopAndEnterAnimations
      }),
      "motion-text-out": (value) => ({
        "--motion-end-text-color": value,
        "--motion-text-color-out-animation": textColorOutAnimation,
        animation: allExitAnimations
      })
    },
    {
      values: theme("motionTextColor"),
      type: "color"
    }
  );
  matchUtilities(
    {
      "motion-text-loop": (value, { modifier }) => ({
        "--motion-loop-text-color": value,
        "--motion-text-color-loop-animation": textColorLoopAnimation(
          modifier || "mirror"
        ),
        animationComposition: "accumulate",
        animation: allLoopAndEnterAnimations
      })
    },
    {
      values: theme("motionTextColor"),
      type: "color",
      modifiers: {
        mirror: "mirror",
        reset: "reset"
      }
    }
  );
}
var baseAnimationsTheme = {
  motionScale: (theme) => ({
    ...theme("scale"),
    DEFAULT: "50%"
  }),
  motionTranslate: {
    "0": "0%",
    "25": "25%",
    "50": "50%",
    "75": "75%",
    "100": "100%",
    "150": "150%",
    DEFAULT: "25%"
  },
  motionRotate: (theme) => ({
    ...theme("rotate"),
    DEFAULT: "12deg"
  }),
  motionBlur: (theme) => theme("blur"),
  motionGrayscale: (theme) => theme("grayscale"),
  motionOpacity: (theme) => ({
    ...theme("opacity"),
    DEFAULT: "0",
    "0": "0.001"
  }),
  motionBackgroundColor: (theme) => flattenColorPalette__default.default(theme("colors")),
  motionTextColor: (theme) => flattenColorPalette__default.default(theme("colors"))
};

// src/defaults.ts
function addDefaults(addBase) {
  addBase({
    /**
     * Easing functions
     */
    "@property --motion-bounce": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "linear(0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765,1, 0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785,0.813, 0.848, 0.891 68.2%, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953,0.973, 1, 0.988, 0.984, 0.988, 1)"
    },
    // from https://www.kvin.me/css-springs
    "@property --motion-spring-smooth": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "linear(0, 0.001 0.44%, 0.0045 0.94%, 0.0195 2.03%, 0.0446 3.19%, 0.0811 4.5%, 0.1598 6.82%, 0.3685 12.34%, 0.4693 15.17%, 0.5663, 0.6498 21.27%, 0.7215 24.39%, 0.7532 25.98%, 0.7829 27.65%, 0.8105, 0.8349 31.14%, 0.8573 32.95%, 0.8776 34.84%, 0.8964 36.87%, 0.9136 39.05%, 0.929 41.37%, 0.9421 43.77%, 0.9537 46.38%, 0.9636 49.14%, 0.9789 55.31%, 0.9888 62.35%, 0.9949 71.06%, 0.9982 82.52%, 0.9997 99.94%)"
    },
    "@property --motion-spring-snappy": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "linear(0, 0.0014, 0.0053 1.02%, 0.0126, 0.0227 2.18%, 0.0517 3.41%, 0.094 4.79%, 0.1865 7.26%, 0.4182 12.77%, 0.5246 15.46%, 0.6249, 0.7112, 0.7831 23.95%, 0.8146 25.4%, 0.844, 0.8699 28.45%, 0.8935, 0.9139 31.64%, 0.932, 0.9473, 0.9601 36.65%, 0.9714 38.47%, 0.9808 40.35%, 0.9948 44.49%, 1.0031 49.43%, 1.0057 53.35%, 1.0063 58.14%, 1.0014 80.78%, 1.0001 99.94%)"
    },
    "@property --motion-spring-bouncy": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "linear(0, 0.0018, 0.0069, 0.0151 1.74%, 0.0277 2.4%, 0.062 3.7%, 0.1115 5.15%, 0.2211 7.77%, 0.4778 13.21%, 0.5912 15.75%, 0.6987 18.44%, 0.7862 20.98%, 0.861 23.59%, 0.8926, 0.9205, 0.945 27.51%, 0.9671 28.89%, 0.9868, 1.003 31.79%, 1.0224 34.11%, 1.0358 36.58%, 1.0436 39.27%, 1.046 42.31%, 1.0446 44.71%, 1.0406 47.47%, 1.0118 61.84%, 1.0027 69.53%, 0.9981 80.49%, 0.9991 99.94%)"
    },
    "@property --motion-spring-bouncier": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "linear(0, 0.0023, 0.0088, 0.0194 1.59%, 0.035 2.17%, 0.078 3.33%, 0.1415 4.64%, 0.2054 5.75%, 0.2821 6.95%, 0.5912 11.45%, 0.7205 13.43%, 0.8393 15.45%, 0.936 17.39%, 0.9778, 1.015, 1.0477, 1.0759, 1.0998 22.22%, 1.1203, 1.1364, 1.1484 25.26%, 1.1586 26.61%, 1.1629 28.06%, 1.1613 29.56%, 1.1537 31.2%, 1.1434 32.6%, 1.1288 34.19%, 1.0508 41.29%, 1.0174 44.87%, 1.0025 46.89%, 0.9911 48.87%, 0.9826 50.9%, 0.9769 53.03%, 0.9735 56.02%, 0.9748 59.45%, 0.9964 72.64%, 1.0031 79.69%, 1.0042 86.83%, 1.0008 99.97%)"
    },
    "@property --motion-spring-bounciest": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "linear(0, 0.0032, 0.0131, 0.0294, 0.0524, 0.0824, 0.1192 1.54%, 0.2134 2.11%, 0.3102 2.59%, 0.4297 3.13%, 0.8732 4.95%, 1.0373, 1.1827 6.36%, 1.2972 7.01%, 1.3444, 1.3859, 1.4215, 1.4504, 1.4735, 1.4908, 1.5024, 1.5084 9.5%, 1.5091, 1.5061, 1.4993, 1.4886, 1.4745, 1.4565 11.11%, 1.4082 11.7%, 1.3585 12.2%, 1.295 12.77%, 1.0623 14.64%, 0.9773, 0.9031 16.08%, 0.8449 16.73%, 0.8014, 0.7701 17.95%, 0.7587, 0.7501, 0.7443, 0.7412 19.16%, 0.7421 19.68%, 0.7508 20.21%, 0.7672 20.77%, 0.7917 21.37%, 0.8169 21.87%, 0.8492 22.43%, 0.9681 24.32%, 1.0114, 1.0492 25.75%, 1.0789 26.41%, 1.1008, 1.1167, 1.1271, 1.1317 28.81%, 1.1314, 1.1271 29.87%, 1.1189 30.43%, 1.1063 31.03%, 1.0769 32.11%, 0.9941 34.72%, 0.9748 35.43%, 0.9597 36.09%, 0.9487, 0.9407, 0.9355, 0.933 38.46%, 0.9344 39.38%, 0.9421 40.38%, 0.9566 41.5%, 0.9989 44.12%, 1.0161 45.37%, 1.029 46.75%, 1.0341 48.1%, 1.0335 49.04%, 1.0295 50.05%, 1.0221 51.18%, 0.992 55.02%, 0.9854 56.38%, 0.9827 57.72%, 0.985 59.73%, 1.004 64.67%, 1.0088 67.34%, 1.0076 69.42%, 0.9981 74.28%, 0.9956 76.85%, 0.9961 79.06%, 1.0023 86.46%, 0.999 95.22%, 0.9994 100%)"
    },
    /**
     * Enter animations origin values
     */
    "@property --motion-origin-scale-x": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-origin-scale-y": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-origin-translate-x": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-origin-translate-y": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-origin-rotate": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0deg"
    },
    "@property --motion-origin-blur": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0px"
    },
    "@property --motion-origin-grayscale": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-origin-opacity": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-origin-background-color": {
      syntax: '"*"',
      inherits: "false"
    },
    "@property --motion-origin-text-color": {
      syntax: '"*"',
      inherits: "false"
    },
    /**
     * Exit animations end values
     */
    "@property --motion-end-scale-x": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-end-scale-y": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-end-translate-x": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-end-translate-y": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-end-rotate": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0deg"
    },
    "@property --motion-end-blur": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0px"
    },
    "@property --motion-end-grayscale": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-end-opacity": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-end-background-color": {
      syntax: '"*"',
      inherits: "false"
    },
    "@property --motion-end-text-color": {
      syntax: '"*"',
      inherits: "false"
    },
    /**
     * Loop animations values
     */
    "@property --motion-loop-scale-x": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-loop-scale-y": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-loop-translate-x": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-loop-translate-y": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-loop-rotate": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0deg"
    },
    "@property --motion-loop-blur": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0px"
    },
    "@property --motion-loop-grayscale": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0%"
    },
    "@property --motion-loop-opacity": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "100%"
    },
    "@property --motion-loop-background-color": {
      syntax: '"*"',
      inherits: "false"
    },
    "@property --motion-loop-text-color": {
      syntax: '"*"',
      inherits: "false"
    },
    /**
     * Animation modifiers
     */
    "@property --motion-duration": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "700ms"
    },
    "@property --motion-timing": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "cubic-bezier(.165, .84, .44, 1)"
    },
    "@property --motion-perceptual-duration-multiplier": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "1"
    },
    "@property --motion-delay": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "0ms"
    },
    "@property --motion-loop-count": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "infinite"
    },
    /**
     * Default animations to none
     */
    "@property --motion-scale-in-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-translate-in-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-rotate-in-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-filter-in-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-opacity-in-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-background-color-in-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-text-color-in-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-scale-out-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-translate-out-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-rotate-out-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-filter-out-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-opacity-out-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-background-color-out-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-text-color-out-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-scale-loop-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-translate-loop-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-rotate-loop-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-filter-loop-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-opacity-loop-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-background-color-loop-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    },
    "@property --motion-text-color-loop-animation": {
      syntax: '"*"',
      inherits: "false",
      "initial-value": "none"
    }
  });
}

// src/keyframes.ts
function addKeyframes(addBase) {
  addBase({
    // if the user prefers reduced motion, don't apply the transform animations
    "@media screen and (prefers-reduced-motion: no-preference)": {
      "@keyframes motion-scale-in": {
        "0%": {
          scale: "var(--motion-origin-scale-x) var(--motion-origin-scale-y)"
        },
        "100%": {
          scale: "1 1"
        }
      },
      "@keyframes motion-scale-out": {
        "0%": {
          scale: "1 1"
        },
        "100%": {
          scale: "var(--motion-end-scale-x) var(--motion-end-scale-y)"
        }
      },
      "@keyframes motion-scale-loop-mirror": {
        "0%, 100%": {
          scale: "1 1"
        },
        "50%": {
          scale: "var(--motion-loop-scale-x) var(--motion-loop-scale-y)"
        }
      },
      "@keyframes motion-scale-loop-reset": {
        "0%": {
          scale: "1 1"
        },
        "100%": {
          scale: "var(--motion-loop-scale-x) var(--motion-loop-scale-y)"
        }
      },
      "@keyframes motion-translate-in": {
        "0%": {
          translate: "var(--motion-origin-translate-x) var(--motion-origin-translate-y)"
        },
        "100%": {
          translate: "0 0"
        }
      },
      "@keyframes motion-translate-out": {
        "0%": {
          translate: "0 0"
        },
        "100%": {
          translate: "var(--motion-end-translate-x) var(--motion-end-translate-y)"
        }
      },
      "@keyframes motion-translate-loop-mirror": {
        "0%, 100%": {
          translate: "0 0"
        },
        "50%": {
          translate: "var(--motion-loop-translate-x) var(--motion-loop-translate-y)"
        }
      },
      "@keyframes motion-translate-loop-reset": {
        "0%": {
          translate: "0 0"
        },
        "100%": {
          translate: "var(--motion-loop-translate-x) var(--motion-loop-translate-y)"
        }
      },
      "@keyframes motion-rotate-in": {
        "0%": {
          rotate: "var(--motion-origin-rotate)"
        },
        "100%": {
          rotate: "0"
        }
      },
      "@keyframes motion-rotate-out": {
        "0%": {
          rotate: "0"
        },
        "100%": {
          rotate: "var(--motion-end-rotate)"
        }
      },
      "@keyframes motion-rotate-loop-mirror": {
        "0%, 100%": {
          rotate: "0deg"
        },
        "50%": {
          rotate: "var(--motion-loop-rotate)"
        }
      },
      "@keyframes motion-rotate-loop-reset": {
        "0%": {},
        "100%": {
          rotate: "var(--motion-loop-rotate)"
        }
      }
    },
    "@keyframes motion-filter-in": {
      "0%": {
        filter: "blur(var(--motion-origin-blur)) grayscale(var(--motion-origin-grayscale))"
      },
      "100%": {
        filter: "blur(0) grayscale(0)"
      }
    },
    "@keyframes motion-filter-out": {
      "0%": {
        filter: "blur(0) grayscale(0)"
      },
      "100%": {
        filter: "blur(var(--motion-end-blur)) grayscale(var(--motion-end-grayscale))"
      }
    },
    "@keyframes motion-filter-loop-mirror": {
      "0%, 100%": {
        filter: "blur(0) grayscale(0)"
      },
      "50%": {
        filter: "blur(var(--motion-loop-blur)) grayscale(var(--motion-loop-grayscale))"
      }
    },
    "@keyframes motion-filter-loop-reset": {
      "0%": {
        filter: "blur(0) grayscale(0)"
      },
      "100%": {
        filter: "blur(var(--motion-loop-blur)) grayscale(var(--motion-loop-grayscale))"
      }
    },
    "@keyframes motion-opacity-in": {
      "0%": {
        opacity: "var(--motion-origin-opacity)"
      }
    },
    "@keyframes motion-opacity-out": {
      "100%": {
        opacity: "var(--motion-end-opacity)"
      }
    },
    "@keyframes motion-opacity-loop-mirror": {
      "0%, 100%": {},
      "50%": {
        opacity: "var(--motion-loop-opacity)"
      }
    },
    "@keyframes motion-opacity-loop-reset": {
      "0%": {},
      "100%": {
        opacity: "var(--motion-loop-opacity)"
      }
    },
    "@keyframes motion-background-color-in": {
      "0%": {
        backgroundColor: "var(--motion-origin-background-color)"
      }
    },
    "@keyframes motion-background-color-out": {
      "100%": {
        backgroundColor: "var(--motion-end-background-color)"
      }
    },
    "@keyframes motion-background-color-loop-mirror": {
      "0%, 100%": {},
      "50%": {
        backgroundColor: "var(--motion-loop-background-color)"
      }
    },
    "@keyframes motion-background-color-loop-reset": {
      "0%": {},
      "100%": {
        backgroundColor: "var(--motion-loop-background-color)"
      }
    },
    "@keyframes motion-text-color-in": {
      "0%": {
        color: "var(--motion-origin-text-color)"
      }
    },
    "@keyframes motion-text-color-out": {
      "100%": {
        color: "var(--motion-end-text-color)"
      }
    },
    "@keyframes motion-text-color-loop-mirror": {
      "0%, 100%": {},
      "50%": {
        color: "var(--motion-loop-text-color)"
      }
    },
    "@keyframes motion-text-color-loop-reset": {
      "0%": {},
      "100%": {
        color: "var(--motion-loop-text-color)"
      }
    }
  });
}

// src/modifiers.ts
var springPerceptualMultipliers = {
  "var(--motion-spring-smooth)": "1.66",
  "var(--motion-spring-snappy)": "1.66",
  "var(--motion-spring-bouncy)": "1.66",
  "var(--motion-spring-bouncier)": "2.035",
  "var(--motion-spring-bounciest)": "5.285",
  "var(--motion-bounce)": "2"
};
function addModifiers(matchUtilities, addUtilities, theme) {
  matchUtilities(
    {
      "motion-duration": (value, { modifier }) => {
        switch (modifier) {
          case "scale":
            return { "--motion-scale-duration": value };
          case "translate":
            return { "--motion-translate-duration": value };
          case "rotate":
            return { "--motion-rotate-duration": value };
          case "blur":
          case "grayscale":
            return { "--motion-filter-duration": value };
          case "opacity":
            return { "--motion-opacity-duration": value };
          case "background":
            return { "--motion-background-color-duration": value };
          case "text":
            return { "--motion-text-color-duration": value };
          default:
            return {
              "--motion-duration": value
            };
        }
      }
    },
    {
      values: theme("motionDuration"),
      modifiers: {
        scale: "scale",
        translate: "translate",
        rotate: "rotate",
        blur: "blur",
        grayscale: "grayscale",
        opacity: "opacity",
        background: "background",
        text: "text"
      }
    }
  );
  matchUtilities(
    {
      "motion-delay": (value, { modifier }) => {
        switch (modifier) {
          case "scale":
            return { "--motion-scale-delay": value };
          case "translate":
            return { "--motion-translate-delay": value };
          case "rotate":
            return { "--motion-rotate-delay": value };
          case "blur":
          case "grayscale":
            return { "--motion-filter-delay": value };
          case "opacity":
            return { "--motion-opacity-delay": value };
          case "background":
            return { "--motion-background-color-delay": value };
          case "text":
            return { "--motion-text-color-delay": value };
          default:
            return {
              "--motion-delay": value
            };
        }
      }
    },
    {
      values: theme("motionDelay"),
      modifiers: {
        scale: "scale",
        translate: "translate",
        rotate: "rotate",
        blur: "blur",
        grayscale: "grayscale",
        opacity: "opacity",
        background: "background",
        text: "text"
      }
    }
  );
  matchUtilities(
    {
      "motion-ease": (value, { modifier }) => {
        const perceptualDurationMultiplier = springPerceptualMultipliers[value] || 1;
        const isSpringWithBounce = [
          "var(--motion-spring-bouncy)",
          "var(--motion-spring-bouncier)",
          "var(--motion-spring-bounciest)",
          "var(--motion-bounce)"
        ].includes(value);
        switch (modifier) {
          case "scale":
            return {
              "--motion-scale-timing": value,
              "--motion-scale-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
            };
          case "translate":
            return {
              "--motion-translate-timing": value,
              "--motion-translate-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
            };
          case "rotate":
            return {
              "--motion-rotate-timing": value,
              "--motion-rotate-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
            };
          case "blur":
          case "grayscale":
            return {
              "--motion-filter-timing": value,
              "--motion-filter-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
            };
          case "opacity":
            return {
              "--motion-opacity-timing": value,
              "--motion-opacity-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
            };
          case "background":
            return {
              "--motion-background-color-timing": value,
              "--motion-background-color-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
            };
          case "text":
            return {
              "--motion-text-color-timing": value,
              "--motion-text-color-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
            };
          default:
            if (isSpringWithBounce) {
              return {
                "--motion-timing": value,
                "--motion-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`,
                // filter, opacity, and color animations don't look good with bouncy springs
                // so we use a smooth spring for them
                "--motion-filter-timing": "var(--motion-spring-smooth)",
                "--motion-opacity-timing": "var(--motion-spring-smooth)",
                "--motion-background-color-timing": "var(--motion-spring-smooth)",
                "--motion-text-color-timing": "var(--motion-spring-smooth)",
                "--motion-filter-perceptual-duration-multiplier": "1.66",
                "--motion-opacity-perceptual-duration-multiplier": "1.66",
                "--motion-background-color-perceptual-duration-multiplier": "1.66",
                "--motion-text-color-perceptual-duration-multiplier": "1.66"
              };
            } else {
              return {
                "--motion-timing": value,
                "--motion-perceptual-duration-multiplier": `${perceptualDurationMultiplier}`
              };
            }
        }
      }
    },
    {
      values: theme("motionTimingFunction"),
      modifiers: {
        scale: "scale",
        translate: "translate",
        rotate: "rotate",
        blur: "blur",
        grayscale: "grayscale",
        opacity: "opacity",
        background: "background",
        text: "text"
      }
    }
  );
  addUtilities({
    ".motion-paused": {
      animationPlayState: "paused",
      "&::before": {
        animationPlayState: "paused"
      },
      "&::after": {
        animationPlayState: "paused"
      }
    },
    ".motion-running": {
      animationPlayState: "running",
      "&::before": {
        animationPlayState: "running"
      },
      "&::after": {
        animationPlayState: "running"
      }
    }
  });
  matchUtilities(
    {
      "motion-loop": (value, { modifier }) => {
        switch (modifier) {
          case "scale":
            return { "--motion-scale-loop-count": value };
          case "translate":
            return { "--motion-translate-loop-count": value };
          case "rotate":
            return { "--motion-rotate-loop-count": value };
          case "blur":
          case "grayscale":
            return { "--motion-filter-loop-count": value };
          case "opacity":
            return { "--motion-opacity-loop-count": value };
          case "background":
            return { "--motion-background-color-loop-count": value };
          case "text":
            return { "--motion-text-color-loop-count": value };
          default:
            return {
              "--motion-loop-count": value
            };
        }
      }
    },
    {
      values: theme("motionLoopCount"),
      modifiers: {
        scale: "scale",
        translate: "translate",
        rotate: "rotate",
        blur: "blur",
        grayscale: "grayscale",
        opacity: "opacity",
        background: "background",
        text: "text"
      }
    }
  );
}
var modifiersTheme = {
  motionTimingFunction: (theme) => ({
    ...theme("transitionTimingFunction"),
    "spring-smooth": "var(--motion-spring-smooth)",
    "spring-snappy": "var(--motion-spring-snappy)",
    "spring-bouncy": "var(--motion-spring-bouncy)",
    "spring-bouncier": "var(--motion-spring-bouncier)",
    "spring-bounciest": "var(--motion-spring-bounciest)",
    bounce: "var(--motion-bounce)",
    "in-quad": "cubic-bezier(.55, .085, .68, .53)",
    "in-cubic": "cubic-bezier(.550, .055, .675, .19)",
    "in-quart": "cubic-bezier(.895, .03, .685, .22)",
    "in-back": "cubic-bezier(0.6,-0.28,0.74,0.05)",
    "out-quad": "cubic-bezier(.25, .46, .45, .94)",
    "out-cubic": "cubic-bezier(.215, .61, .355, 1)",
    "out-quart": "cubic-bezier(.165, .84, .44, 1)",
    "out-back": "cubic-bezier(0.18,0.89,0.32,1.27)",
    "in-out-quad": "cubic-bezier(.455, .03, .515, .955)",
    "in-out-cubic": "cubic-bezier(.645, .045, .355, 1)",
    "in-out-quart": "cubic-bezier(.77, 0, .175, 1)",
    "in-out-back": "cubic-bezier(0.68,-0.55,0.27,1.55)"
  }),
  motionDuration: (theme) => ({
    ...theme("transitionDuration"),
    1500: "1500ms",
    2e3: "2000ms",
    DEFAULT: "750ms"
  }),
  motionDelay: (theme) => ({
    ...theme("motionDuration"),
    DEFAULT: "0ms"
  }),
  motionLoopCount: {
    infinite: "infinite",
    once: "1",
    twice: "2"
  }
};
function addPresets(addComponents, matchComponents) {
  matchComponents(
    {
      "motion-preset-fade": (size) => {
        const durations = {
          sm: "300ms",
          md: "500ms",
          lg: "800ms"
        };
        return {
          "--motion-origin-opacity": "0",
          "--motion-duration": durations[size],
          "--motion-opacity-in-animation": opacityInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-right": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-x": `-${distance[size]}`,
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-left": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-x": distance[size],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-up": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-y": distance[size],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-down": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-y": `-${distance[size]}`,
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-up-right": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-x": `-${distance[size]}`,
          "--motion-origin-translate-y": distance[size],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-up-left": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-x": distance[size],
          "--motion-origin-translate-y": distance[size],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-down-left": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-x": distance[size],
          "--motion-origin-translate-y": `-${distance[size]}`,
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-slide-down-right": (size) => {
        const distance = {
          sm: "5%",
          md: "25%",
          lg: "100%"
        };
        return {
          "--motion-origin-translate-x": `-${distance[size]}`,
          "--motion-origin-translate-y": `-${distance[size]}`,
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-focus": (size) => {
        const blurSizes = {
          sm: "1.25px",
          md: "5px",
          lg: "10px"
        };
        return {
          "--motion-origin-blur": blurSizes[size],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-filter-in-animation": filterInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-blur-right": (size) => {
        const blurSizes = {
          sm: "1.25px",
          md: "5px",
          lg: "10px"
        };
        const distance = {
          sm: "1%",
          md: "5%",
          lg: "25%"
        };
        return {
          "--motion-origin-blur": blurSizes[size],
          "--motion-origin-translate-x": `-${distance[size]}`,
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-filter-in-animation": filterInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-blur-left": (size) => {
        const blurSizes = {
          sm: "1.25px",
          md: "5px",
          lg: "10px"
        };
        const distance = {
          sm: "1%",
          md: "5%",
          lg: "25%"
        };
        return {
          "--motion-origin-blur": blurSizes[size],
          "--motion-origin-translate-x": distance[size],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-filter-in-animation": filterInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-blur-up": (size) => {
        const blurSizes = {
          sm: "1.25px",
          md: "5px",
          lg: "10px"
        };
        const distance = {
          sm: "1%",
          md: "5%",
          lg: "25%"
        };
        return {
          "--motion-origin-blur": blurSizes[size],
          "--motion-origin-translate-y": distance[size],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-filter-in-animation": filterInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-blur-down": (size) => {
        const blurSizes = {
          sm: "1.25px",
          md: "5px",
          lg: "10px"
        };
        const distance = {
          sm: "1%",
          md: "5%",
          lg: "25%"
        };
        return {
          "--motion-origin-blur": blurSizes[size],
          "--motion-origin-translate-y": `-${distance[size]}`,
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-filter-in-animation": filterInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      }
    },
    {
      values: {
        sm: "sm",
        md: "md",
        lg: "lg",
        DEFAULT: "md"
      }
    }
  );
  matchComponents(
    {
      "motion-preset-rebound": (direction) => {
        const directions = {
          right: {
            "--motion-origin-translate-x": "-25%"
          },
          left: {
            "--motion-origin-translate-x": "25%"
          },
          up: {
            "--motion-origin-translate-y": "25%"
          },
          down: {
            "--motion-origin-translate-y": "-25%"
          }
        };
        return {
          ...directions[direction],
          "--motion-translate-timing": "var(--motion-spring-bouncier)",
          "--motion-translate-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bouncier)"],
          "--motion-origin-opacity": "0",
          "--motion-opacity-in-animation": opacityInAnimation,
          "--motion-translate-in-animation": translateInAnimation,
          animation: allLoopAndEnterAnimations
        };
      }
    },
    {
      values: {
        right: "right",
        left: "left",
        up: "up",
        down: "down",
        DEFAULT: "left"
      }
    }
  );
  addComponents({
    ".motion-preset-bounce": {
      "--motion-duration": "300ms",
      "--motion-translate-timing": "var(--motion-bounce)",
      "--motion-translate-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-bounce)"],
      "--motion-origin-opacity": "0",
      "--motion-origin-translate-y": "-25%",
      "--motion-opacity-in-animation": opacityInAnimation,
      "--motion-translate-in-animation": translateInAnimation,
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-expand": {
      "--motion-origin-scale-x": "50%",
      "--motion-origin-scale-y": "50%",
      "--motion-origin-opacity": "0",
      "--motion-opacity-in-animation": opacityInAnimation,
      "--motion-scale-in-animation": scaleInAnimation,
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-shrink": {
      "--motion-origin-scale-x": "150%",
      "--motion-origin-scale-y": "150%",
      "--motion-origin-opacity": "0",
      "--motion-opacity-in-animation": opacityInAnimation,
      "--motion-scale-in-animation": scaleInAnimation,
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-pop": {
      "--motion-origin-scale-x": "50%",
      "--motion-origin-scale-y": "50%",
      "--motion-origin-opacity": "0",
      "--motion-scale-timing": "var(--motion-spring-bouncier)",
      "--motion-scale-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bouncier)"],
      "--motion-opacity-in-animation": opacityInAnimation,
      "--motion-scale-in-animation": scaleInAnimation,
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-compress": {
      "--motion-origin-scale-x": "150%",
      "--motion-origin-scale-y": "150%",
      "--motion-origin-opacity": "0",
      "--motion-scale-timing": "var(--motion-spring-bouncier)",
      "--motion-scale-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bouncier)"],
      "--motion-opacity-in-animation": opacityInAnimation,
      "--motion-scale-in-animation": scaleInAnimation,
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-shake": {
      "--motion-duration": "300ms",
      "--motion-origin-rotate": "15deg",
      "--motion-origin-opacity": "0",
      "--motion-rotate-timing": "var(--motion-spring-bounciest)",
      "--motion-rotate-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bouncier)"],
      "--motion-opacity-in-animation": opacityInAnimation,
      "--motion-rotate-in-animation": rotateInAnimation,
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-wiggle": {
      "--motion-duration": "300ms",
      "--motion-origin-rotate": "15deg",
      "--motion-origin-translate-x": "-25%",
      "--motion-origin-translate-y": "-10%",
      "--motion-origin-opacity": "0",
      "--motion-timing": "var(--motion-spring-bounciest)",
      "--motion-perceptual-duration-multiplier": "5.285",
      "--motion-opacity-timing": "var(--motion-spring-smooth)",
      "--motion-opacity-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bouncier)"],
      "--motion-opacity-in-animation": opacityInAnimation,
      "--motion-rotate-in-animation": rotateInAnimation,
      "--motion-translate-in-animation": translateInAnimation,
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-confetti": {
      display: "block",
      "-webkit-appearance": "none",
      appearance: "none",
      position: "relative",
      outline: "0",
      zIndex: "1",
      margin: "0",
      animation: "RomboConfettiPop var(--motion-duration) var(--motion-timing)  both",
      "@keyframes RomboConfettiPop": {
        "0%": {
          opacity: "0",
          transform: "scale(1)"
        },
        "33%": {
          opacity: "1",
          transform: "scale(1.15)"
        },
        "50%": {
          transform: "scale(0.975)"
        },
        "65%": {
          transform: "scale(1.025)"
        },
        "80%": {
          transform: "scale(0.99)"
        },
        "87%": {
          transform: "scale(1.01)"
        },
        "100%": {
          opacity: "1",
          transform: "scale(1)"
        }
      },
      "&:after": {
        display: "block",
        animationDuration: "var(--motion-duration)",
        animationTimingFunction: "var(--motion-timing)",
        animationIterationCount: "1",
        animationDirection: "normal",
        animationFillMode: "forwards",
        animationName: "bottomfetti",
        position: "absolute",
        content: '" "',
        zIndex: "-1",
        width: "100%",
        height: "100%",
        left: "-20%",
        top: "100%",
        transition: "all var(--motion-timing) var(--motion-duration)",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(circle, #a2dd60 20%, transparent 20%),radial-gradient(circle, transparent 20%, #ee65a9 20%, transparent 30%),radial-gradient(circle, #6092dd 20%, transparent 20%),radial-gradient(circle, #f3c548 20%, transparent 20%),radial-gradient(circle, transparent 10%, #46ec99 15%, transparent 20%),radial-gradient(circle, #f03e47 20%, transparent 20%),radial-gradient(circle, #7b4df7 20%, transparent 20%),radial-gradient(circle, #3ff1bc 20%, transparent 20%)",
        backgroundSize: "15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%"
      },
      "&:before": {
        display: "block",
        animationDuration: "var(--motion-duration)",
        animationTimingFunction: "var(--motion-timing)",
        animationIterationCount: "1",
        animationDirection: "normal",
        animationFillMode: "forwards",
        animationName: "topfetti",
        position: "absolute",
        content: '" "',
        width: "100%",
        height: "100%",
        left: "-5%",
        backgroundRepeat: "no-repeat",
        transition: "all var(--motion-timing) var(--motion-duration)",
        zIndex: "-1",
        top: "-90%",
        backgroundImage: "radial-gradient(circle, #a2dd60 30%, transparent 20%),radial-gradient(circle, transparent 20%, #ee65a9 40%, transparent 20%),radial-gradient(circle, #6092dd 30%, transparent 20%),radial-gradient(circle, #f3c548 30%, transparent 20%),radial-gradient(circle, transparent 10%, #46ec99 15%, transparent 20%),radial-gradient(circle, #f03e47 30%, transparent 20%),radial-gradient(circle, #7b4df7 30%, transparent 30%),radial-gradient(circle, #3ff1bc 30%, transparent 20%),radial-gradient(circle, #48f088 30%, transparent 30%)",
        backgroundSize: "10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 25% 25%"
      },
      "@keyframes topfetti": {
        "0%": {
          backgroundPosition: "5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%"
        },
        "50%": {
          backgroundPosition: "0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%"
        },
        "100%": {
          backgroundPosition: "0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%",
          backgroundSize: "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%"
        }
      },
      "@keyframes bottomfetti": {
        "0%": {
          backgroundPosition: "10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,70% -10%, 70% 0%"
        },
        "50%": {
          backgroundPosition: "0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%"
        },
        "100%": {
          backgroundPosition: "0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%",
          backgroundSize: "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%"
        }
      }
    }
  });
  matchComponents(
    {
      "motion-preset-pulse": (size) => {
        const sizes = {
          sm: "1.1",
          md: "1.25",
          lg: "1.5"
        };
        return {
          "--motion-loop-scale-x": sizes[size],
          "--motion-loop-scale-y": sizes[size],
          "--motion-timing": "cubic-bezier(0.4, 0, 0.2, 1)",
          "--motion-scale-loop-animation": scaleLoopAnimation("mirror"),
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-wobble": (size) => {
        const sizes = {
          sm: "5%",
          md: "15%",
          lg: "25%"
        };
        return {
          "--motion-loop-translate-x": sizes[size],
          "--motion-timing": "cubic-bezier(0.4, 0, 0.2, 1)",
          "--motion-translate-loop-animation": translateLoopAnimation("mirror"),
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-seesaw": (size) => {
        const sizes = {
          sm: "3deg",
          md: "6deg",
          lg: "12deg"
        };
        return {
          "--motion-loop-rotate": sizes[size],
          "--motion-rotate-loop-animation": rotateLoopAnimation("mirror"),
          "--motion-rotate-timing": "var(--motion-spring-bounciest)",
          "--motion-rotate-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bounciest)"],
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-oscillate": (size) => {
        const sizes = {
          sm: "5%",
          md: "15%",
          lg: "25%"
        };
        return {
          "--motion-loop-translate-y": sizes[size],
          "--motion-timing": "cubic-bezier(0.4, 0, 0.2, 1)",
          "--motion-translate-loop-animation": translateLoopAnimation("mirror"),
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-stretch": (size) => {
        const xSizes = {
          sm: "95%",
          md: "85%",
          lg: "75%"
        };
        const ySizes = {
          sm: "105%",
          md: "115%",
          lg: "125%"
        };
        return {
          "--motion-loop-scale-x": xSizes[size],
          "--motion-loop-scale-y": ySizes[size],
          "--motion-scale-timing": "var(--motion-spring-bouncier)",
          "--motion-scale-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bouncier)"],
          "--motion-scale-loop-animation": scaleLoopAnimation("mirror"),
          animation: allLoopAndEnterAnimations
        };
      },
      "motion-preset-float": (size) => {
        const sizes = {
          sm: "50%",
          md: "100%",
          lg: "150%"
        };
        return {
          "--motion-loop-translate-y": sizes[size],
          "--motion-translate-timing": "var(--motion-spring-bouncier)",
          "--motion-translate-perceptual-duration-multiplier": springPerceptualMultipliers["var(--motion-spring-bouncier)"],
          "--motion-duration": "2000ms",
          "--motion-translate-loop-animation": translateLoopAnimation("mirror"),
          animation: allLoopAndEnterAnimations
        };
      }
    },
    {
      values: {
        sm: "sm",
        md: "md",
        lg: "lg",
        DEFAULT: "md"
      }
    }
  );
  addComponents({
    ".motion-preset-spin": {
      "--motion-loop-rotate": "360deg",
      "--motion-timing": "linear",
      "--motion-rotate-loop-animation": rotateLoopAnimation("reset"),
      animation: allLoopAndEnterAnimations
    }
  });
  addComponents({
    ".motion-preset-blink": {
      "--motion-loop-opacity": "0",
      "--motion-opacity-loop-animation": opacityLoopAnimation("mirror"),
      animation: allLoopAndEnterAnimations
    }
  });
  matchComponents({
    "motion-preset-typewriter": (value) => ({
      "--motion-duration": "2000ms",
      "--motion-typewriter-value": `${value}ch`,
      animation: `typing var(--motion-duration) steps(${value}) var(--motion-loop-count), blink 0.4s step-end infinite alternate`,
      whiteSpace: "nowrap",
      borderRight: "2px solid",
      fontFamily: "monospace",
      overflow: "hidden",
      "@media screen and (prefers-reduced-motion: no-preference)": {
        "@keyframes typing": {
          "10%, 90%": {
            width: "0"
          },
          "40%, 60%": {
            width: `calc(var(--motion-typewriter-value) + 1px)`
          }
        }
      },
      "@keyframes blink": {
        "50%": {
          borderColor: "transparent"
        }
      }
    })
  });
  matchComponents(
    {
      "motion-preset-flomoji": (value) => ({
        position: "relative",
        "&:before": {
          content: `"${value}"`,
          animation: "emojiAnim 3000ms infinite cubic-bezier(0, 0.2, 0.2, 1) both",
          top: "0px",
          left: "0px",
          position: "absolute",
          zIndex: "1000",
          background: "rgba(255,255,255,0.3)",
          width: "2rem",
          height: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100%",
          padding: "2px",
          paddingBottom: "6px"
        },
        "@media screen and (prefers-reduced-motion: no-preference)": {
          "@keyframes emojiAnim": {
            "0%": {
              transform: "translateY(-200%) rotate(60deg)"
            },
            "30%": {
              transform: "rotate(50deg)"
            },
            "40%": {
              transform: "rotate(55deg)"
            },
            "50%": {
              transform: "rotate(45deg)"
            },
            "60%": {
              transform: "rotate(40deg)"
            },
            "100%": {
              transform: "translateY(-200%) rotate(25deg)"
            }
          }
        }
      })
    },
    {
      values: {
        "\u{1F449}": "\u{1F449}",
        "\u{1F680}": "\u{1F680}",
        "\u{1F440}": "\u{1F440}",
        "\u{1F44D}": "\u{1F44D}"
      }
    }
  );
}

// src/index.ts
var pluginCreator = ({
  matchUtilities,
  theme,
  addBase,
  addUtilities,
  addComponents,
  matchComponents
}) => {
  addDefaults(addBase);
  addKeyframes(addBase);
  addPresets(addComponents, matchComponents);
  addBaseAnimations(matchUtilities, theme);
  addModifiers(matchUtilities, addUtilities, theme);
};
var pluginConfig = {
  theme: {
    ...modifiersTheme,
    ...baseAnimationsTheme
  }
};
var index_default = createPlugin__default.default(pluginCreator, pluginConfig);

module.exports = index_default;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map