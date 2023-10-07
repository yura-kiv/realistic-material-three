import "../css/styles.css";
import { getPlane, getSphere } from "./objects";
import Viewer from "./viewer";

export default class App {
  constructor() {
    this.viewer = new Viewer();
    getPlane(this.viewer);
    getSphere(this.viewer);
  }
}
