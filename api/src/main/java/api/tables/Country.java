package api.tables;

//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "countries")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "country_id")
    private int id;

    @Column(name = "country_code")
    private String code;

    @Column(name = "country_fullname")
    private String fullname;

//    @OneToMany(mappedBy = "country", orphanRemoval = true, fetch = FetchType.EAGER)
//    @JsonIgnoreProperties("country")
//    @JsonManagedReference
//    private List<Location> locations;

    public Country(){

    }

    public Country(String code, String fullname){
        this.code = code;
        this.fullname = fullname;
    }

    public int getId(){
        return this.id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

//    public List<Location> getLocations() {
//        return locations;
//    }
//
//    public void setLocations(List<Location> locations) {
//        this.locations = locations;
//    }
}
