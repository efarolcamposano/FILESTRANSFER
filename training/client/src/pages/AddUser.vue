<template>
    <div class="container">
        <h3 class="text-center mb-3">Add User</h3>

        <router-link to="/users" class="btn btn-primary mb-5">Back</router-link>
        <button type="submit" class="btn btn-success float-right"  @click="addUser">Save</button>

        <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Last name</span>
            </div>
            <input type="text" class="form-control" id="lastName"  v-model="lastname" placeholder="Last Name">
        </div>
 
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">First name</span>
            </div>
            <input type="text" class="form-control" id="firstName" v-model="firstname" placeholder="First Name">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Middle name</span>
            </div>
            <input type="text" class="form-control" id="middleName" v-model="middlename"  placeholder="Middle Name">
        </div>

        <div class="row">
            <div class="col-sm-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Nickname</span>
                    </div>
                    <input type="text" class="form-control" id="nickname" v-model="nickname"  placeholder="Nickname">
                </div>
            </div>
            <div class="col-sm-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Birthday</span>
                    </div>
                    <input type="date" class="form-control" v-model="birth_date" id="birthdate">
                </div>
            </div>
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Email</span>
            </div>
            <input type="email" class="form-control" id="email" v-model="email"  placeholder="Email">
        </div>


    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "Home",
    methods: {
        async addUser(){
            await this.$apollo.mutate({
                mutation: gql`mutation ($firstname: String!, $lastname: String!, $middlename: String!, $nickname: String!, $birth_date: String!, $email: String!) {
                    insert_users(objects: {firstname: $firstname, lastname: $lastname, middlename: $middlename, nickname: $nickname, birth_date: $birth_date, email: $email }){
                        affected_rows
                        returning {
                            id
                            firstname
                            lastname
                            middlename
                            nickname
                            birth_date
                            email
                            updated_at
                            created_at
                        }
                    }
                }`,
                variables: {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    middlename: this.middlename,
                    nickname: this.nickname,
                    birth_date: this.birth_date,
                    email: this.email
                },
            });

            alert("New User Added!");
            location.reload();
        }
        
    },
    data() {
        return {
            firstname: '',
            lastname: '',
            middlename: '',
            nickname: '',
            birth_date: '',
            email: ''
        };
    }
}

</script>

<style scoped>
    .input-group-text {
        width: 150px;
        background: none;
        border: 0;
    }
</style>