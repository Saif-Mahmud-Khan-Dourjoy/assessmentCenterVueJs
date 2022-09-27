<template name="component-name">
    <h4>{{formattedOptions}}</h4>
    <h4>{{value}}</h4> 
    <div class="nsl-multiselect" @click="handleClick" @blur="focused=false" tabindex="-1">
        <div class="nsl-multiselect__options" v-show="focused">
            <div class="nsl-multiselect__option"
                :class="{'nsl-multiselect__option--checked': option.checked}"
                v-for="(option, i) in formattedOptions" 
                :key="i">
                <div class="nsl-multiselect__checkbox">
                    
                </div>
                <div class="nsl-multiselect__text">
                    {{option[displayProperty]}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: {
            options: {
                type: Array,
                default: () => []
            },
            value: {
                default: ()=> []
            },
            placeholder: {
                type: String,
                default: "Click to Select"
            },
            displayProperty: {
                type: String,
                default: "name"
            },
            valueProperty: {
                type: String,
                default: "value"
            }

        },
        data(){
            return{
                focused: false,
            }
        },
        computed: {
            formattedOptions(){
                let temp = this.options.map(option=>{
                    console.log(this.value);
                    let checked = this.value.some(v => v===option[this.valueProperty] );
                    return { ...option, checked};
                });
                console.log(temp);
                return temp;
            }
        },
        methods: {
            handleClick(){
                this.focused = !this.focused;
            }
        }

    }
</script>

<style>
.nsl-multiselect{
    background: #fff;
    padding: 6px 12px;
    margin: 8px 0px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    min-height: 33px;
    min-width: 222px;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
}
.nsl-multiselect:focus{
    outline: none;
}
.nsl-multiselect__placeholder{
    color: #929292;
}
.nsl-multiselect__selected{
    border: 1px solid #e0e0e0;
    padding: 4px 8px;
    padding-right: 0;
    margin: 3px 3px;
}
.nsl-multiselect__remove{
    cursor: pointer;
    padding-right: 7px;
}
.nsl-multiselect__remove:hover{
    color: red;
    font-weight: bold;
}

.nsl-multiselect__options{
    position: absolute;
    top: 34px;
    right: 0;
    left: 0;
    display: flex;
    background: #fff;
    flex-direction: column;
    box-shadow: 0 3px 3px 2px #e3e3e3;
    padding: 5px 0;
    min-height: 55px;
    max-height: 188px;
    overflow-y: auto;
}
.nsl-multiselect__option{
    padding: 6px 11px;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.nsl-multiselect__option--checked{
    color: #1f7bb8;
    font-weight: bold;
}
.nsl-multiselect__checkbox{
    width: 22px;
    height: 22px;
    border: 1px solid #969696;
    margin-right: 7px;
    position: relative;
}
.nsl-multiselect__option--checked .nsl-multiselect__checkbox::after{
    width: 11px;
    height: 6px;
    border-left: 2px solid rgb(255, 2555, 255);
    border-bottom: 2px solid rgb(255, 2555, 255);
    content: "";
    z-index: 9999;
    position: absolute;
    transform: rotate(-45deg);
    left: 3px;
    top: 4px;
}
</style>