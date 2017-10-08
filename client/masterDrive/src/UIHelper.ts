class UIHelper  {
    
    private static colors = ["red","blue","orange","purple","green","yellow"];

    public static get RED():string{
        return UIHelper.colors[0];
    } 
    public static get BLUE():string{
        return UIHelper.colors[1];
    }
    public static get ORANGE():string{
        return UIHelper.colors[2];
    }
    public static get PURPLE():string{
        return UIHelper.colors[3];
    }
    public static get GREEN():string{
        return UIHelper.colors[4];
    }
    public static get YELLOW():string{
        return UIHelper.colors[5];
    }

    public static getRandomColor(){
        var index = Math.floor(Math.random()*6);
        return UIHelper.colors[index];
    }

    public static getCarBMP(type:string,color:string):egret.Bitmap{
        var name = "car" + type + "_" + color + "_png";
        return UIHelper.createBitmapByName(name);
    }
    

    public static  createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}
