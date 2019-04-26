<template>
<v-footer color="indigo" app>
    <span class="white--text">&copy; {{ getYear }}</span>
</v-footer>
</template>


<script>

    export default {
        data: () => ({

        }),
        computed: {
            getYear () {
                const today = new Date();
                return today.getFullYear();
            }
        }
    }

</script>