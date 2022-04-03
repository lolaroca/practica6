package com.lolaroca.todoApp;

import java.io.Serializable;

public class Task implements Serializable{
    private int id;
    private String todo;

    
    public Task(int id, String todo) {
        this.id = id;
        this.todo = todo;
    }
    public int getId() {
        return id;
    }
    public String getTodo() {
        return todo;
    }
    public void setTodo(String todo) {
        this.todo = todo;
    }
    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj){
        if(obj instanceof Task){
            Task other = (Task) obj;
            if(other.id==this.getId()){
                return true;
            }
        }
        return false;
    }
    
}
