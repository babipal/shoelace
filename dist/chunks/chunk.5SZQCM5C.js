import {
  tooltip_styles_default
} from "./chunk.NGU6VN5C.js";
import {
  SlPopup
} from "./chunk.NS3JH2ZN.js";
import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.STXFIMXZ.js";
import {
  waitForEvent
} from "./chunk.B4BZKR24.js";
import {
  animateTo,
  parseDuration,
  stopAnimations
} from "./chunk.W5IOVX7A.js";
import {
  LocalizeController
} from "./chunk.2A3352EO.js";
import {
  watch
} from "./chunk.C7FWPEOY.js";
import {
  ShoelaceElement
} from "./chunk.Z7XDKKOD.js";
import {
  __decorateClass
} from "./chunk.6M63UXML.js";

// src/components/tooltip/tooltip.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
var SlTooltip = class extends ShoelaceElement {
  constructor() {
    super();
    this.localize = new LocalizeController(this);
    this.content = "";
    this.placement = "top";
    this.disabled = false;
    this.distance = 8;
    this.open = false;
    this.skidding = 0;
    this.trigger = "hover focus";
    this.hoist = false;
    this.handleBlur = () => {
      if (this.hasTrigger("focus")) {
        this.hide();
      }
    };
    this.handleClick = () => {
      if (this.hasTrigger("click")) {
        if (this.open) {
          this.hide();
        } else {
          this.show();
        }
      }
    };
    this.handleFocus = () => {
      if (this.hasTrigger("focus")) {
        this.show();
      }
    };
    this.handleKeyDown = (event) => {
      if (this.open && event.key === "Escape") {
        event.stopPropagation();
        this.hide();
      }
    };
    this.handleMouseOver = () => {
      if (this.hasTrigger("hover")) {
        const delay = parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.show(), delay);
      }
    };
    this.handleMouseOut = () => {
      if (this.hasTrigger("hover")) {
        const delay = parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
      }
    };
    this.addEventListener("blur", this.handleBlur, true);
    this.addEventListener("focus", this.handleFocus, true);
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeyDown);
    this.addEventListener("mouseover", this.handleMouseOver);
    this.addEventListener("mouseout", this.handleMouseOut);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated() {
    this.body.hidden = !this.open;
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }
      this.emit("sl-show");
      await stopAnimations(this.body);
      this.body.hidden = false;
      this.popup.active = true;
      const { keyframes, options } = getAnimation(this, "tooltip.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      await stopAnimations(this.body);
      const { keyframes, options } = getAnimation(this, "tooltip.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.popup.active = false;
      this.body.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  /** Shows the tooltip. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the tooltip */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  //
  // NOTE: Tooltip is a bit unique in that we're using aria-live instead of aria-labelledby to trick screen readers into
  // announcing the content. It works really well, but it violates an accessibility rule. We're also adding the
  // aria-describedby attribute to a slot, which is required by <sl-popup> to correctly locate the first assigned
  // element, otherwise positioning is incorrect.
  //
  render() {
    return html`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${classMap({
      tooltip: true,
      "tooltip--open": this.open
    })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        arrow
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open ? "polite" : "off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `;
  }
};
SlTooltip.styles = tooltip_styles_default;
SlTooltip.dependencies = { "sl-popup": SlPopup };
__decorateClass([
  query("slot:not([name])")
], SlTooltip.prototype, "defaultSlot", 2);
__decorateClass([
  query(".tooltip__body")
], SlTooltip.prototype, "body", 2);
__decorateClass([
  query("sl-popup")
], SlTooltip.prototype, "popup", 2);
__decorateClass([
  property()
], SlTooltip.prototype, "content", 2);
__decorateClass([
  property()
], SlTooltip.prototype, "placement", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlTooltip.prototype, "disabled", 2);
__decorateClass([
  property({ type: Number })
], SlTooltip.prototype, "distance", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], SlTooltip.prototype, "open", 2);
__decorateClass([
  property({ type: Number })
], SlTooltip.prototype, "skidding", 2);
__decorateClass([
  property()
], SlTooltip.prototype, "trigger", 2);
__decorateClass([
  property({ type: Boolean })
], SlTooltip.prototype, "hoist", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch(["content", "distance", "hoist", "placement", "skidding"])
], SlTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch("disabled")
], SlTooltip.prototype, "handleDisabledChange", 1);
setDefaultAnimation("tooltip.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 150, easing: "ease" }
});
setDefaultAnimation("tooltip.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 150, easing: "ease" }
});

export {
  SlTooltip
};