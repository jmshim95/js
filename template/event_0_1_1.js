import {Event_0_1_0} from "./event_0_1_0.js";

export class Event_0_1_1 extends Event_0_1_0 {

    constructor(props) {
        super(props);
    }

    doSomething01() {
        const ta01 = document.querySelector("#template_act_01");
        ta01.textContent = `VanillaJS로 모듈 import 할때는 확장자명 js를 반드시 같이 기재해야 한다네요ㅜㅜ.
        -> (import Parent from "./parent.js";)`;
        console.log(`event_0_1_1 doSomething01`);
    }

}