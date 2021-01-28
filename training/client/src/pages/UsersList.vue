<template>
    <div class="container">
        <router-link to="/adduser" class="btn btn-success mb-4">Add</router-link>

        <div class="search-input mb-4">
            <!-- <input type="text" v-model="searchQuery" placeholder="Search" > -->
        </div>

        <div v-if="$apollo.loading">Loading...</div>

        <ul class="list-group">
            <li class="list-group-item" v-for="user in users" :key="user.id"> 
                <router-link :to="{ name: 'user', params: { id: user.id } }">
                    {{ user.lastname }}, {{ user.firstname }}
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: "Home",
    data() {
        return {
            searchQuery: ''
        }
    },
    apollo: {
        users: gql`query {
            users (
                order_by: [
                 {firstname: desc},
                ]
            ) {
                id
                firstname
                lastname
                middlename
                nickname
                birth_date
            }
        }`,
    }
}

</script>


<style scoped>
.list-group-item {
    padding: 0;
}

.list-group-item a {
    color: #514f4f;
    padding: .75rem 1.25rem;
    display: block;
    text-decoration: none;
}

.list-group-item:hover {
    transition: .1s ease-out;
    background-color: #007bff;
    cursor: pointer;
}

.list-group-item:hover a {
    color: #fff;
}
</style>