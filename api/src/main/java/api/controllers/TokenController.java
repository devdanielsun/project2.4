package api.controllers;

import api.tables.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.sql.Timestamp;

public class TokenController {

    static UserController uc = new UserController();

    public static String createNewToken(String email, String password){
        String jwt = "token";
        User u = (User) uc.get(uc.getId(email));
        Timestamp t = new Timestamp(System.currentTimeMillis()+ 600 * 1000);
        try {
            jwt = Jwts.builder()
                    .setExpiration(t)
                    .claim("userId", u.getId())
                    .claim("email", u.getEmail())
                    .claim("isAdmin", u.isAdmin())
                    .signWith(
                            SignatureAlgorithm.HS256,
                            "ontzettendgeheimesleutel".getBytes("UTF-8")
                    )
                    .compact();

        } catch (Exception e){
            e.printStackTrace();
        }
        return jwt;
    }

    public static TokenResponse validToken(String token){
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey("ontzettendgeheimesleutel".getBytes("UTF-8"))
                    .parseClaimsJws(token).getBody();
            int id = (Integer) claims.get("userId");
            User u = (User) uc.get(id);
            boolean isAdmin = (boolean) claims.get("isAdmin");
            return new TokenResponse(id, true, isAdmin);
        } catch (ExpiredJwtException ve) {
            return new TokenResponse(false, "Token invalid");
        } catch (Exception e) {
            e.printStackTrace();
            return new TokenResponse(false, "Oeps, something went wrong");
        }

    }
}
