<template>
<div class="input-file">
  <v-text-field label="Select Image" v-model='imageName' prepend-icon='cloud_upload'></v-text-field>
  <input type="file" ref="image" :accept="allowedFileTypes" @change="onFilePicked" />
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'file-input',
  data: () => ({
    imageName: '',
    imageFile: ''
  }),

  props: {
    selectedCallback: Function,
    allowedFileTypes: String,
  },

  methods: {
    getFileExtension(filename) {
      return '.' + filename.split('.').pop();
    },

    isFileAllowed(filename) {
      const fileTypes = _.map(this.allowedFileTypes.toLowerCase().split(','), (type) => type.trim())
      return _.includes(fileTypes, this.getFileExtension(filename).toLowerCase());
    },

    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined && this.isFileAllowed(files[0].name)) {
        this.imageName = files[0].name
        this.selectedCallback(files[0], this.imageName);
        return files[0]
      }

      this.imageName = ''
      return null;
    }
  }
}
</script>

<style scoped>
.input-file {
   cursor: pointer;
   position: relative;
   overflow: hidden;
 }

.input-file input[type=file]{
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
</style>
