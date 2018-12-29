<template>
<div>
    <hr>
    <span style="display:flex;justify-content:center;align-items:center;">- {{loadingFinished}} -</span>
    <div v-show="false" class="mx-auto" style="width: 200px;text-align:center;">
    - {{loadingFinished}} -
    </div>    
</div>
</template>
<script>
export default {
    data() {
        return {
            loadingFinished: '已加載所有資料'
        }
    }
}
</script>