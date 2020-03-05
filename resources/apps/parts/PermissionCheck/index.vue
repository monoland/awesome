<template>
    <label 
        class="d-block" 
        @click.stop 
        style="position: relative; height: 24px; width: 24px;"
    >
        <v-icon>{{ iconChecked }}</v-icon>
        
        <input style="position: absolute; top: 0; left: 0; opacity: 0;"
            :value="value"
            :checked="isChecked"
            type="checkbox"
            @change="updateInput"
        >
    </label>
</template>

<script>
export default {
    name: 'v-permission-check',

    model: {
        prop: 'modelValue',
        event: 'change'
    },

    props: {
        items: {
            type: Array,
            default: []
        },

        modelValue: {
            type: Array,
            default: []
        },

        falseValue: {
            default: false
        },

        reffs: {
            type: Array,
            default: []
        },

        trueValue: {
            default: true
        },

        value: {
            type: [String, Number]
        }
    },

    computed: {
        isChecked: function() {
            return this.modelValue.includes(this.value);
        },

        iconChecked: function() {
            let itemIcon = 'check_box_outline_blank';

            if (this.items && this.items.length) {

                let allSelect = this.reffs.every(el => this.items.indexOf(el) > -1);

                if (allSelect) {
                    itemIcon = 'check_box';
                } else {
                    this.reffs.forEach(reff => {
                        if (this.items.includes(reff)) {
                            itemIcon = 'indeterminate_check_box';
                            return;
                        }
                    });   
                }
            }

            return itemIcon;
        }
    },

    methods: {
        updateInput: function(event) {
            let isChecked = event.target.checked;
            
            let newValue = [...this.modelValue];

            if (isChecked) {
                newValue.push(this.value);
            } else {
                newValue.splice(newValue.indexOf(this.value), 1);
            }

            this.$emit('change', newValue);
        }
    }
};
</script>