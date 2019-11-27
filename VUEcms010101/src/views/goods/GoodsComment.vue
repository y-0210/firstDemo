<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>

</template>

<script>
    import cmtbox from "../../components/comment";
    export default {
        name: "GoodsComment",
        components:{
            cmtbox
        }
    }
</script>

<style lang="scss">

</style>