class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    toString(){
        return this.x+'+'+this.y;
    }
}

var point=new Point(2,3);
console.log(point.toString());

class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);
        this.color=color;

    }
    add(){
      return this.x*this.y;
    }
    toString(){
        return super.toString()+"="+this.add();
    }
}
var cp=new ColorPoint(1.2,1.2,'red');
console.log(cp.toString());
