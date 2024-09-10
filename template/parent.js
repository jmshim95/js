export class Parent {

    constructor() {
        this._init();
    }

    templateAct01() {
        this.doSomething01();
        this.doSomething02();
    }

    templateAct02() {
        this.doSomething03();
    }

    templateAct03() {
        this.completeSomething();
        this._finalize();
    }

    _init(){
        document.querySelector("#templateAct01").onclick = () => this.templateAct01();
        document.querySelector("#templateAct02").onclick = () => this.templateAct02();
        document.querySelector("#templateAct03").onclick = () => this.templateAct03();
        console.log(`template init`);
    }

    doSomething01() {
        throw "this is abstract method";
    }

    doSomething02() {
        throw "this is abstract method";
    }

    doSomething03() {
        throw "this is abstract method";
    }

    completeSomething() {
        throw "this is abstract method";
    }

    _finalize() {
        console.log(`template finalize`);
    }
}