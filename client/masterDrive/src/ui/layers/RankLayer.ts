class RankLayer extends EuiComponent{
    private lst_rank:eui.List;
    private dsListHeros:Array<Object> = [];
    uiCompHandler():void{
        var self = this;
        /// 填充数据
        net.http.postReq(
			net.Route.R_GET_TOP10,
            {},
			(data)=>{
                var dataArr = JSON.parse(data).data;
                
				for(var i = 0 ; i < dataArr.length;i++){
                    self.dsListHeros.push({username:dataArr[i].username,score:dataArr[i].score});
                }
                this.lst_rank.dataProvider = new eui.ArrayCollection( self.dsListHeros );;
			},
			self
    	)
        
        this.lst_rank.dataProvider = new eui.ArrayCollection( self.dsListHeros );

        this.lst_rank.itemRenderer = RankListItem;
    }
}


class RankListItem extends eui.ItemRenderer {

    constructor() {
        super();
        this.skinName = "resource/skins/RankListItemSkin.exml";
    }

    protected createChildren():void {
        super.createChildren();
    }

    protected dataChanged():void{//data整个背替换才会掉用这个方法，data里面数据改变不会出发datachanged
        //console.log( "datachanged");
     }

}