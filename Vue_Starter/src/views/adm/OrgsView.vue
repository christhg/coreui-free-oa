<template>
    <div>
        <b-form-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </b-form-input>   
        <hr>
        <my-tree 
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2,3]"
        :default-checked-keys="[5]"
        :props="defaultProps" 
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        ref="orgTree">
        </my-tree>
    </div>
</template>
<script>
import { Tree,MessageBox } from 'element-ui'
import { getOrgsTree } from '@/api/Orgs/getOrgsTree.js'
import { getOrgsNode } from '@/api/Orgs/getOrgsNode.js'

export default {
    data(){
        return {
            filterText: '',
            data:[],
            defaultProps: {
                label: 'label',
                children: 'children'
            }
        }
    },
    components:{
        'my-tree': Tree
    },
    watch: {
      filterText(val) {
        this.$refs.orgTree.filter(val);
      }
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
            getOrgsTree(this.$store.getters.pub_company_id).then( response => {
                this.data.push(response.data.Data)
            })
            .catch(error=> {
                MessageBox.alert(error)
            })
        },
        // fetchNode(node){
        //     getOrgsNode('2200',node).then( response => {
        //         console.log(response.data.Data)
        //     })
        //     .catch(error=> {
        //         MessageBox.alert(error)
        //     })
        // },
        handleNodeClick(data) {
            //console.log(data)
            //this.fetchNode(data.id)
            this.$router.push({path:'OrgsEdit',query: { nodeNo: data.id }})
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
}
</script>