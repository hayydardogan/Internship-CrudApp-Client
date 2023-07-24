

<template>
    <div class="container mt-5">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" placeholder="E.g.  John" v-model="std.name">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Surname</label>
            <input type="text" class="form-control" placeholder="E.g.  Lennon" v-model="std.surname">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">E-Mail</label>
            <input type="email" class="form-control" placeholder="E.g.  johnlennon@gmail.com" v-model="std.email">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Student No</label>
            <input type="text" class="form-control" placeholder="E.g.  0123456789" v-model="std.studentNo">
        </div>
        <button class="btn btn-info text-white" @click="updateStd()">Update</button>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            id: null,
            url: "http://localhost:3000/api/",
            std : {
                name: null,
                surname: null,
                email : null,
                studentNo: null
            }
        }
    },
    methods: {
        writeId() {
            console.log(this.$router);
            console.log();
        },
        getData() {
            axios.get(this.url + "/getData/" + this.id).then(
                response => {
                    this.std.name = response.data.name;
                    this.std.surname = response.data.surname;
                    this.std.email = response.data.email;
                    this.std.studentNo = response.data.studentNo;
                }
            ).catch(err => {
                console.log("hata: " + err);
            })
        },
        updateStd(){
            var updatedData = {
                name: this.std.name,
                surname: this.std.surname,
                email: this.std.email,
                studentNo: this.std.studentNo
            };

            axios.post(this.url + "/updateStudent/" + this.id, updatedData).then(
                response => {
                    if(response.data.message){
                        this.$router.push({ path: '/' })
                    }
                    else{
                        console.log("hata");
                    }
                }
            )
        }
    },
    mounted() {
        this.id = this.$router.currentRoute._rawValue.params.id;
        this.getData();
    }
}


</script>