package api.controllers;

public class TokenResponse {
    private int userId;
    private boolean tokenValid;
    private String newToken;
    private boolean isAdmin;
    private Object message;

    public TokenResponse(int userId, boolean tokenValid, boolean isAdmin){
        this.userId = userId;
        this.tokenValid = tokenValid;
        this.isAdmin = isAdmin;

    }

    public TokenResponse(int userId, boolean tokenValid, String newToken, boolean isAdmin){
        this.userId = userId;
        this.tokenValid = tokenValid;
        this.isAdmin = isAdmin;
        this.newToken = newToken;

    }

    public TokenResponse(int userId, boolean tokenValid, boolean isAdmin, Object message){
        this.userId = userId;
        this.tokenValid = tokenValid;
        this.isAdmin = isAdmin;
        this.message = message;
    }

    public TokenResponse(int userId, boolean tokenValid, String newToken, boolean isAdmin, Object message){
        this.userId = userId;
        this.tokenValid = tokenValid;
        this.isAdmin = isAdmin;
        this.message = message;
        this.newToken = newToken;
    }

    public TokenResponse(boolean tokenValid, Object message){
        this.tokenValid = tokenValid;
        this.message = message;
    }

    public TokenResponse(boolean tokenValid, boolean isAdmin){
        this.tokenValid = tokenValid;
        this.isAdmin = isAdmin;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getNewToken() {
        return newToken;
    }

    public void setNewToken(String newToken) {
        this.newToken = newToken;
    }

    public void setTokenValid(boolean tokenValid) {
        this.tokenValid = tokenValid;
    }

    public boolean isTokenValid() {
        return tokenValid;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }
}
