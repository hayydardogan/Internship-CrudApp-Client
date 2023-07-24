<script setup>
import axios from 'axios';


</script>

<template>
  <main>
    <div class="container mt-5">
      <div style="display: flex; justify-content: space-between;">
        <div class="add-student">
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addStudentModal">New student</button>
        </div>
        <div class="alert" :class="{ show: isShow, 'alert-success': isSuccess, 'alert-danger': isDanger }" role="alert"
          id="resultAlert">

        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="addStudentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Add new student</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input type="text" class="form-control" placeholder="E.g.  John" v-model="student.name">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Surname</label>
                <input type="text" class="form-control" placeholder="E.g.  Lennon" v-model="student.surname">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">E-Mail</label>
                <input type="email" class="form-control" placeholder="E.g.  johnlennon@gmail.com" v-model="student.email">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Student No</label>
                <input type="text" class="form-control" placeholder="E.g.  0123456789" v-model="student.studentNo">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addStudent()">Save student</button>
            </div>
            <div class="modal-footer" id="registerResult">
              test string
            </div>
          </div>
        </div>
      </div>

      <div class="list-student mt-3">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Student No</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in stdList">
              <td>{{ item.name }}</td>
              <td>{{ item.surname }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.studentNo }}</td>
              <td><button class="btn btn-info text-white" @click="this.$router.push('/studentDetails/'+item._id)">Update</button></td>
              <td><button class="btn btn-danger" @click="deleteStudent(item._id)">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  </main>
</template>

<script>
export default {
  data() {
    return {
      stdList: [],
      url: "http://localhost:3000/api/",
      student: {
        name: null,
        surname: null,
        email: null,
        studentNo: null
      },
      isShow: false,
      isSuccess: false,
      isDanger: false
    }
  },
  methods: {
    getList() {
      axios
        .get(this.url + "/studentList")
        .then(response => {
          this.stdList = response.data;
          let item = document.getElementById("registerResult");
          item.style.display = "none";
        })
    },
    deleteStudent(_p) {
      axios.get(this.url + "/deleteStudent/" + _p).then(
        response => {
          if (response.data.isSuccess) {
            var item = document.getElementById("resultAlert");
            item.textContent = "Silme işlemi başarılı.";
            this.isSuccess = true;
            this.isDanger = false;
            this.isShow = true;
            setTimeout(this.getList, 2000);

          }
        }
      ).catch(err => {

        var item = document.getElementById("resultAlert");
        item.textContent = "Silme işlemi başarısız.";
        this.isSuccess = false;
        this.isDanger = true;
        this.isShow = true;
      }

      )
    },
    addStudent() {
      var newStd = {
        name: this.student.name,
        surname: this.student.surname,
        email: this.student.email,
        studentNo: this.student.studentNo
      }
      axios.post(this.url + "/addStudent", newStd).then(
        response => {
          let item = document.getElementById("registerResult");
          item.style.display = "block";
          item.textContent = "Kayıt işlemi başarılı."
          item.style.color = "green";

          setTimeout(this.getList, 2000);

        }
      )
        .catch(err => {
          let item = document.getElementById("registerResult");
          item.style.display = "block";
          item.textContent = "Bir hata oluştu."
          item.style.color = "red";
        })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
