import {Parent} from "./parent.js";

export class Event_0_0_1 extends Parent {

    constructor(props) {
        super(props);
        this._childInit();
    }

    _childInit() {
        const initDiv = document.querySelector("#init");
        initDiv.textContent = `init from event_0_0_1.js`;
        console.log(`event_0_0_1 init`);
    }

    doSomething01() {
        const ta01 = document.querySelector("#template_act_01");
        ta01.textContent = `doSomething01 from event_0_0_1.js`;
        console.log(`event_0_0_1 doSomething01`);
    }

    doSomething02() {
        const ta02 = document.querySelector("#template_act_02");
        ta02.textContent = `doSomething02 from event_0_0_1.js`;
        console.log(`event_0_0_1 doSomething02`);
    }

    doSomething03() {
        const ta03 = document.querySelector("#template_act_03");
        ta03.textContent = `doSomething03 from event_0_0_1.js`;
        console.log(`event_0_0_1 doSomething03`);
    }

    completeSomething() {
        console.log(`event_0_0_1 completeSomething`);
    }

}