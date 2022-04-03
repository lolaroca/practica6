package com.lolaroca.todoApp;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.websocket.server.PathParam;

//cuando actualizas spring boot estas actualizando esto
//cuando hacer /contacts busca esto 
@RestController //esta clase va a responder a peticiones de recursos 
public class TaskController {

    private ArrayList <Task> tasks = new ArrayList <Task>();

    @GetMapping("/tasks") //si te llega esto, respondes a ella
    public ResponseEntity<ArrayList<Task>> getTasks() {
        return new ResponseEntity<ArrayList<Task>>(tasks,HttpStatus.OK);
    }

    //si buscas /task con este método este se va a encaegar de devolver esto
    @PostMapping("/tasks")
    public ResponseEntity<Task> postTasks(@RequestBody Task task) {
        int id = tasks.size();
        task.setId(id);
        tasks.add(task);

        return new ResponseEntity<Task>(task,HttpStatus.OK);
    }

    //asi eliminamos el que queremos
    @DeleteMapping("/tasks/{idString}")
    public ResponseEntity<ArrayList<Task>> deleteTask(@PathVariable String idString){
        int id= Integer.parseInt(idString);
        Task clone = new Task(id, "");
        tasks.remove(clone);
        
        return  new ResponseEntity<ArrayList<Task>>(new ArrayList<Task>(),HttpStatus.NO_CONTENT);
        
      
    }

    
}
