import {Event_0_0_1} from "./event_0_0_1";

export class Event_0_0_2 extends Event_0_0_1 {

    constructor(props) {
        super(props);
        this._childInit();
    }

    _childInit() {
        console.log(`event_0_0_2 init`);
    }

    doSomething03() {
        const ta03 = document.querySelector("#template_act_03");
        ta03.textContent = `doSomething03 from event_0_0_2.js`;
        console.log(`event_0_0_2 doSomething03`);
    }

}