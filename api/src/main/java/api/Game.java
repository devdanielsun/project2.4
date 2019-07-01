package api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "gamename")
    private String name;

    @Column(name = "website")
    private String website;

    @Column(name = "client_token")
    private String client_token;

    @OneToMany(mappedBy = "game")
    @JsonIgnoreProperties("game")
    private List<Topscore> topscores;

    public Game(){

    }

    public Game(String name, String website, String client_token){
        this.name = name;
        this.website = website;
        this.client_token = client_token;
    }

    public int getId(){
        return this.id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String email) {
        this.website = website;
    }

    public String getClient_token() {
        return client_token;
    }

    public void setClient_token(String password) {
        this.client_token = password;
    }

    public List<Topscore> getTopscores() {
        return topscores;
    }

    public void setTopscores(List<Topscore> topscores) {
        this.topscores = topscores;
    }

    @Override
    public String toString() {
        return "[id: "+id+", name: "+name+", website: "+website+"]";
    }
}
