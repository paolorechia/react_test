import * as React from "react"
import "./App.css"

class Title extends React.Component {
  public render(){
    return (
      <h3 className="title" > Todo manager</h3>
    )
  }
}

class Done extends React.Component<any, any> {
  constructor(props: any){
    super(props);
  }
  public render(){
    let class_ = "Button" + this.props.class_;
    return (
      <td>
        <button id={this.props.id}
                onClick={this.props.click}
                className={class_}
        > 
          {this.props.class_}
        </button>
        <button id={this.props.id}
                onClick={this.props.clickRemove}
                className="ButtonRemove"
        > 
          Remove
        </button>
      </td>
    )
  }
}

class Item extends React.Component<any, any> {
  constructor(props: any){
    super(props);
  }
  public render(){
    let class_ = "Item" + this.props.class_;
    return (
      <td className = {class_}> {this.props.name} </td>
    )
  }
}

class Line extends React.Component<any, any> {
  constructor(props: any){
    super(props);
  }
  public render(){
    let text: string;
    if (this.props.finished)
      text = "Undo";
    else
      text = "Done";
    return (
      <tr> 
        <Item 
          name = {this.props.name}
          class_ = {text}
        /> 
        <Done
          id = {this.props.id}
          click = {this.props.click}
          class_ = {text}
          clickRemove = {this.props.clickRemove}
         />
      </tr>
    )
  }
}

class Input extends React.Component<any, any> {
  constructor(props: any){
    super(props);
  }
  public render(){
    return (
      <form onSubmit={(e) => this.props.handler(e)}> 
        <input autoFocus
               type="text" name="New task"
               placeholder="Write your task here"
               id= {this.props.id}
         />
      </form>
    )
  }
}

interface TodoItem {
  id: number,
  name: string,
  finished: boolean,
}

interface ItemList extends Array<TodoItem> {
}

class TodoApp extends React.Component<{}, {todo_list: ItemList}> {
  private todo_list: ItemList;
  private currentId: number;

  constructor(props: any){
    super(props);
    this.currentId = 0;
    this.todo_list = [];
    this.state = {
      todo_list: this.todo_list,
    }
  }


  public addItem(new_item: TodoItem){
    this.setState((state, props) => {
      this.todo_list.push(new_item);
      return {todo_list: this.state.todo_list};
    });
  }
  public removeItem(item_id: number){
    this.setState((state, props) => {
      console.log(this.state.todo_list);
      let list = this.state.todo_list;
      for (let i = 0; i < list.length; i++){
        if (list[i].id == item_id){
          this.state.todo_list.splice(i, 1);
        }
      }
      return {todo_list: this.state.todo_list};
    });
  }
  public finishItem(item_id: number){
    this.setState((state, props) => {
      let list = this.state.todo_list;
      for (let i = 0; i < list.length; i++){
        if (list[i].id == item_id)
          this.state.todo_list[i].finished = true;
      }
      return {todo_list: this.state.todo_list};
    });
  }
  public undoItem(item_id: number){
    this.setState((state, props) => {
      let list = this.state.todo_list;
      for (let i = 0; i < list.length; i++){
        if (list[i].id == item_id)
        this.state.todo_list[i].finished = false;
      }
      return {todo_list: this.state.todo_list};
    });
  }
  public handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const el: any = document.getElementById('input-id');
    if (el)
      if (el.value.length > 0){
        this.addItem({id: this.currentId,
                      name: el.value, finished: false});
        el.value = "";
        this.currentId = this.currentId + 1;
      }
  }
  public clickHandler(e: any){
    console.log(e.target);
    let id: number = e.target.id;
    console.log(id);
    let list: ItemList = this.state.todo_list;
    for (let i: number = 0; i < list.length; i++){
      if (list[i].id == id){
        console.log("Clicked on target " + id);
        if (list[i].finished)
          this.undoItem(id);
        else
          this.finishItem(id); 
      }
    }
    return null;
  }

  public clickRemover(e: any){
    console.log(e.target);
    let id: number = e.target.id;
    console.log(id);
    let list: ItemList = this.state.todo_list;
    for (let i: number = 0; i < list.length; i++){
      if (list[i].id == id){
        console.log("Removing target " + id);
          this.removeItem(id); 
      }
    }
    return null;
  }

  public compare(a: TodoItem, b: TodoItem){
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  }
  public render() {
    let todo_lines:JSX.Element[] = [];
    let done_lines:JSX.Element[] = [];
    let list: ItemList = this.state.todo_list;
    list.sort(this.compare);
    console.log(list);
    for (let i: number = 0; i < list.length; i++){
      let cur_name: string = list[i].name;
      let cur_id: number = list[i].id;
      let is_finished: boolean = list[i].finished; 
      if (is_finished)
        done_lines.push(<Line id={cur_id}
                         key={cur_id} 
                         name = {cur_name}
                         finished = {is_finished}
                         click={(e: any) =>this.clickHandler(e)}
                         clickRemove={(e: any) =>this.clickRemover(e)} />)
      else
        todo_lines.push(<Line id={cur_id}
                         key={cur_id} 
                         name = {cur_name}
                         finished = {is_finished}
                         click={(e: any) =>this.clickHandler(e)}
                         clickRemove={(e: any) =>this.clickRemover(e)} />)
    }
    return (
      <div className="App">
        <div className="App-title">
          <Title />
        </div>
        <div className="App-Input">
          <Input 
            handler={(e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e)}
            id = "input-id"
          />
        </div>
        <div className="App-Todo">
          <table>
            <tbody>
              {todo_lines}
            </tbody>
          </table>
        </div>
        <div className="App-Done">
          <table>
            <tbody>
              {done_lines}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TodoApp
