<template>
    <div class="container">
        <h3 class="text-center">User</h3>

        <div class="row">
            <div class="col-3">
                <router-link to="/users" class="btn btn-primary mb-5">Back</router-link>
            </div>
            <div class="col-9 text-right">
                <button type="submit" class="btn btn-danger mr-3"  @click="deleteUser">Delete</button>
                <button type="submit" class="btn btn-success"  @click="updateUser">update</button>
            </div>
        </div>

        <div v-for="user in users" :key="user.id">

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Last name</span>
                </div>
                <input type="text" class="form-control" id="lastName"   @input="user.lastname = $event.target.value" :value="user.lastname" placeholder="Last Name">
            </div>
    
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">First name</span>
                </div>
                <input type="text" class="form-control" id="firstName" @input="user.firstname = $event.target.value" :value="user.firstname" placeholder="First Name">
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Middle name</span>
                </div>
                <input type="text" class="form-control" id="middleName" @input="user.middlename = $event.target.value" :value="user.middlename" placeholder="Middle Name">
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Nickname</span>
                        </div>
                        <input type="text" class="form-control" id="nickname" @input="user.nickname = $event.target.value" :value="user.nickname" placeholder="Nickname">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Birthday</span>
                        </div>
                        <input type="date" class="form-control" id="birthdate" @input="user.birth_date = $event.target.value" :value="user.birth_date">
                    </div>
                </div>
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Email</span>
                </div>
                <input type="email" class="form-control" id="email" @input="user.email = $event.target.value" :value="user.email" placeholder="Email">
            </div>



        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "Home",
    methods: {
        async updateUser(){
            await this.$apollo.mutate({
                mutation: gql`
                    mutation MyMutation($birth_date: String, $email: String, $firstname: String, $lastname: String, $middlename: String, $nickname: String, $id: Int!) {
                    update_users(_set: {birth_date: $birth_date, email: $email, firstname: $firstname, lastname: $lastname, middlename: $middlename, nickname: $nickname}, where: {id: {_eq: $id}}){
                        affected_rows
                    }
                }`,
                variables: {
                    id: this.id,
                    firstname: this.users[0].firstname,
                    lastname: this.users[0].lastname,
                    middlename: this.users[0].middlename,
                    nickname: this.users[0].nickname,
                    birth_date: this.users[0].birth_date,
                    email: this.users[0].email
                },
            });

            alert("Updated!");
            location.reload();
        },
        async deleteUser() {
            await this.$apollo.mutate({
                mutation: gql`
                      mutation ($id: Int!) {
                        delete_users(where: {id: {_eq: $id}}){
                        affected_rows
                    }
                }`,
                variables: {
                    id: this.id,
                },
            });
            console.log("done");
            alert("Deleted!");
            location.reload();
            // this.$router.go(-1);
        }
    },
    apollo: {
         users: {
            query: gql`query ($id: Int!){
                users( where: {id: {_eq: $id}} )
                {
                    id
                    firstname
                    lastname
                    middlename
                    nickname
                    birth_date
                    email
                }
            }`,
            variables () {
                return {
                    id: this.id
                }
            }
         },
    },
    data () {
        return {
            id: this.$route.params.id 
        }
    },
}

 </script>

 <style scoped>
    .input-group-text {
        width: 150px;
        background: none;
        border: 0;
    }

    input {
        text-transform: capitalize;
    }
</style>