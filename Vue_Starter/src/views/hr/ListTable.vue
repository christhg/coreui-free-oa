<template>
<div>
    <table class="table table-hover table-striped">
        <thead>
        <tr>
            <th style="width: 20px;">No.</th>
            <th style="width: 120px;">工號</th>
            <th style="width: 120px;">姓名</th>
            <th style="width: 130px;">新增(移除)一行</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(row,index) in rows" :key="index">
                <td>
                {{index+1}}                  
                </td>                           
                <td>
                    <input class="form-control" v-model="row.EMP_NO"  v-bind:readonly="(index===0)?true:isReadonly" required/>
                </td>
                <td>
                    <input class="form-control" v-model="row.EMP_NAME"  v-bind:readonly="(index===0)?true:isReadonly" required/>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-primary" @click="addRow(index)" :disabled="isReadonly"><i class='fa fa-plus-circle'></i></button>
                    <button type="button" class="btn btn-outline-danger" @click="removeRow(index)" :disabled="isReadonly"><i class="fa fa-minus-circle"></i></button>                
                </td>
            </tr>
        </tbody>
    </table>
</div>    
</template>
<script>

export default {
    props:['rows','isReadonly'],
    data(){
        return {
            // rows: [
            //     //initial data
            //     {EMP_NO: "810015", EMP_NAME: "Alex Chen"},
            //     {EMP_NO: "810016", EMP_NAME: "Miky Tsai"}
            // ]
        }
    },
    computed: {
        rowlist(){
               if(this.selected.length === 0 ) return this.rows
                //var n = this.rows.length + 1
                var s = this.selected
                this.rows.splice(1, 0, {OVERTIME_ITEM:'',EMP_NO: s.VALUE, EMP_NAME: s.TEXT})
                return this.rows
        }
    },
    methods: {
        addRow: function (index) {
            try {
                var n = index +1
                this.rows.splice(index + 1, 0, {OVERTIME_ITEM:'',EMP_NO: '', EMP_NAME: ''});
            } catch(e)
            {
                console.log(e);
            }
        },
        removeRow: function (index) {
            if(index == 0 ) return
            this.rows.splice(index, 1);
        }
    }
}
</script>