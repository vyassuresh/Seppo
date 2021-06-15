import "../css/main.scss";
import Glide from "@glidejs/glide";

if (module.hot) {
  module.hot.accept();
}

new Glide(".testimonials__slider", {
  hoverpause: true,
  autoplay: 3000,
  type: "carousel",
}).mount();
