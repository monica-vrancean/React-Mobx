import { TodoItemStore } from "../../store/todo-item-store";
import { observer } from "mobx-react";
import * as React from "react";
import { action } from "mobx";
import * as classNames from "classnames";
import { TodoItemStatus } from "../../models/todo-model";

interface Props{
  store:TodoItemStore;
  deleteTodo:Function;
}

@observer
class TodoItemComponent extends React.Component<Props> {
   store: TodoItemStore;

   constructor(props:Props){
      super(props);
      this.store = props.store;      
  }


  completeTodo(){
    this.store.completeTodo();
  }

  editTodo(){
    this.store.editTodo();
  }

  isEditable():boolean{
    return this.store.isEditable;
  }

  keyPress(e: any){
    if(e.keyCode == 13){
      this.store.updateTodo(e.target.value);
    }
  }

  @action.bound
  resetEditable(){
    this.store.resetEditableTodo();
  }

  public render(){       
        return (
           <li className={classNames({'completed': this.store.status === TodoItemStatus.completed})} >
            <span className="checked" onClick={()=>this.store.completeTodo()}>&#9989;</span>
            {this.isEditable() ? 
              <input defaultValue={this.store.title} onKeyDown={this.keyPress.bind(this)} onBlur={this.resetEditable}/> :
              <span> {this.store.title}</span>}
            <img className="edit" onClick={()=>this.store.editTodo()} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMLSURBVGhD7dnZq01hGMfxbcg8zwpXEpGZZArJeEHcnRsupFy6JIor/4KSO+5wIUkJmckslHJJZJ6nTN/fPuett7d3rb322etZe6/yq09nn31Wvc+zzt5rve+7Ki2YRdiJXViCLihV+uA4/gbOYRhKETVxFmETzgMMR8vnEGIN+ErRzGS8RKwBn5oZgZbKfExqf1nNFJSumaX4hOfwm5mK0jSzCl/giiptM8cQFhU2Mw2vEB4XuomeaEp64ATCosJmpuM1wuNCW1FYdIbXtb+sJs9mjqCQqBh9TH5io97oSNZmZuANwuOcUzCPivDP6A90ppmZeIvwONkL02jw2JnM2swL1GrmPUbDLLORdAals83Mwjvob9+xDGaZC52psKiQmslyAQib0UnSfWZt9TejzEOWJhw14xeUtZl+HT9NorlTPU04akZ3e5eszZhkAT4gHDyrr9gAl6RmLsMsC/ER4aD1qnUBuItRMInW15rF+gU1IqmZCxikNyyyGJ8RK6gRsWa0FDaJdjf8qXjewmZMopuQZRPOPXSHSZajiCYeweyLvQJFNPEQI2GSldC1PjZwnkyXr7rrfkNs4Dzdh9m+1WpolhkbOE93YNaEJnO6DMYGztNtDIVJNO8poolbGAKTaF/pN2ID50lbOYNhln2IDZynGzCbO7no6hEbPC/XMRCmGQd/0JPYH7zXiKswb0LZBn9g/a70wlhovbwGejTmH5eFFkWFNKGEqzL9h2KZCP+4Wi5hAAqJFvT+HVzflaSMgV9omovoj8KyHn4BunolRR8R/9gkWtmZ7njEcgB+EVqLJ0WPjP1jY86jLwqNCnsGV4S2OrshLYfhF+7TI2Wz5WlatK/qF6Ii06JpRRtia/YzaEoTym74xTzFBLjoP6ad9R24gl/wj3dOo2lNKNcQFqVmNkPfHW3zh38PadrRG02LVmSNTBIfQ1c40+39LNmEWIFJNL3XR2g7xqNlknb1cfTROgjtNRV6c6snepgYFv4H+szvwRx0RctHhT6BHp4cxRaY7Sn9T2oqlX9SK0RR8PvP0gAAAABJRU5ErkJggg=="/>
            <img className="delete" onClick={()=>this.props.deleteTodo(this.store.title)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATtSURBVGhD7ZpZqFZlFIZPVmqTiRbajJU4RF1IGhENRAQGRV3YBFGiKCrYQFE3BkojjTShQXkTRSWi5AiGFXVZUFBWWKJmkY0UzePzbFyw2ecf9vTvczicFx4O37f/b9rftNbap29YQ1gnw03wLLwBX8JP8B/8Dd/Dx7AO7oNL4XAYFBoHt8K7YIeL8iu8BLPhIGhcx8BD8DNEp76BV2AJXATHw2gIHQ1T4Uq4B94GZyrKfwBXQyMDspEF8B3Y+L/gUrkcDoWicrC3wecQA3JZToOeyVnYANHgejgT6tAhcCPsA+v+DXxhtWs67AEb+QqcgV7oSHgSnGnbeg4cZC2aCbGUXoeJ0Gu5j34A23wNRkIluXT2gxV6ulSusIDOAo9w214DB0MpuSdiOb0AI6BpnQ7xIh8xo6g8nTaCFWyHJmciq3PA+8Z9c4UZReSJ4SDc2BPMGGAtBPvj7Iw3I4+OhW/Bgr06ncoojv6VSSqHvLEt4D2RV15spx7AGzyPjoIok2fW/Z33i9bAZDM6SdtJs8P1WOSymwcOXrS7up397sFt4O9tS1srj54Ay3i/dNQtUHQ2QpsgBnOnGR0Ua15yLxV0EvwFzsxYM9rpPbDyMnvD5aWpbnkbajf9mvth3u8Eb/Mi8oK0bFsT5hTwB270MgagugGsQ96ErCVreiv43LV+HhTVdWB5V0BL6RT5g5eTVHmthRjMIjNSSu+lB80oIY/ff8BZbfnCV4EN6E9UkSeQvol12diJoPz7I5j/PlS5ZPVdrGdGksroLfDhhUmqmuaAdYnnf3pJ/QHaUVX0IliXy6yfvgAfnpCkqsslGoOJDSp3QVWtAOtalqQyipPksCRVXRqdmjgxAHkHSluxKS0F63s4SWXkAzdRnYoGAx20OjQXrO+ZJJWRF40P65KBhw8hPZD7oQ7Fhfp0ksooPLK8tlI3hc0mvxz4692hWV5Vt4P1tXwxO8CHdUz/uRChHv0ZOx9pg3RV9+HjYF03J6mMtK98WNh5ychOfgrWpQE6CZQXoHnyqBkVFE7fZUkqo3vBhwbPqugxiA6nb3b3zEdgvofKBVBG3knh/mq39ZOxWB96RJaVnbOT1qOZnrW1ZkEssTIGo9K9sPxnSaqFDCjrG9vQcWYU1BFg52zEO6nl20LpJdby1OkiL0HLdjT/Dfn4I0+FonoKooPzzWgjl1gcLDpVl0BeOcOx/zqaUnpq/shYbJEI38UQ0cEtkF1SWaVPtd0wBvLIzW2ZXdCxDR+GZalZn1fXgl6h5LXVroEoc7YZOeT+tW+Lk1QXheWqEWmAYLDoerBfeyHXPeSsGNq3kAHlwSAN0AifOvu5dQbod5eK7tUsX2xcgPo0hRWGmV5dXd9Bykh7yn44I6WjnqvBSlyXU8xoWH7Nsn3vt0qeq05Q2GCaBX4raUIupwfAdj2ma1neo+BVsNKefRJLyShJxHlt7yqoTc6MbmVcejZ0GtQtj9g4nXSTz4eeyE9iEepx3RqLbWdTFZEWRVx2onXQ8098BrqNgYWJ8Sd4PHq+e97nkXvAk1AD8BOIAfhV1xu/URnbfR5+h+iIJrwmjsbncjD4oAHpvroD9Ow2w9cQZUTbycBg+h8MGpc+vh11VtL/CdEN/QlnVh9mIL5PdpQWs2FMI4B3gwEIO6vf4XHqZwv3g58HhjWE1df3P+zYfnzakA/IAAAAAElFTkSuQmCC"/>
          </li>
    );
}
  
}

export default TodoItemComponent;
