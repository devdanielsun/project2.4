package api.controllers;

import java.awt.*;
import java.sql.Timestamp;

public class Message {
    private Timestamp timestamp;
    private int status;
    private String error;
    private String comment;
    private Object message;

    public Message(int status, String error){
        this.status = status;
        this.error = error;
    }

    public Message(int status, String error, String comment){
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.status = status;
        this.error = error;
        this.comment = comment;
        this.message = null;
    }

    public Message(int status, String error, String comment, Object message){
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.status = status;
        this.error = error;
        this.comment = comment;
        this.message = message;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "{'timestamp': '"+timestamp+"','status' : '"+status+"', 'comment': '"+comment+"', 'message': '"+message+"'}";
    }
}
