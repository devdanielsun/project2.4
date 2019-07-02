package api.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "followers")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User u1;
//
//    @ManyToOne
//    @JoinColumn(name = "friend_id", nullable = false)
//    @JsonBackReference(value = "vrienden")
//    private User u2;

    @Column(name = "user_id")
    private int u1;

    @Column(name = "friend_id")
    private int u2;

    public Friend(){

    }

    public Friend(int userId1, int userId2){
        this.u1 = userId1;
        this.u2 = userId2;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getU1() {
        return u1;
    }

    public void setU1(int u1) {
        this.u1 = u1;
    }

    public int getU2() {
        return u2;
    }

    public void setU2(int u2) {
        this.u2 = u2;
    }
}
