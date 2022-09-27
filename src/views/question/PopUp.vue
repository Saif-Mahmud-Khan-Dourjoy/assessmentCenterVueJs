<template>
  <!-- <div class="popup-div">
    <div class="popup-main-content"> -->
  <!-- <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> -->
  <!-- <div class="cross-div">
      <i class="fa-solid fa-xmark cross" @click="crossClick()"></i>
    </div> -->
  <div>
    <!-- <h4 class="popup-heading">Useful Tips</h4> -->
    <p class="popup-para">
      You can create Both multiple & true false question.
    </p>
    <p class="popup-para">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit eget
      malesuada enim enim. Mattis
    </p>
    <h4 class="popup-heading">Related Tasks</h4>
    <p class="popup-para">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit eget
      malesuada enim enim. Mattis
    </p>
    <h4 class="popup-heading">Import Questions</h4>
    <p class="popup-para">Lorem ipsum dolar</p>
  </div>
  <!-- </div> -->
  <!-- </div>
  </div> -->
</template>
<script>
export default {
  methods: {
    crossClick() {
      this.$emit("crossClick");
    },
  },
};
</script>

<style scoped>
.popup-div {
  padding: 15px;
  display: flex;
  justify-content: center;
  z-index: 9999;
  position: fixed;
}
.popup-main-content {
  background-color: white;
  padding: 15px;
  position: relative;
}
.popup-heading {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #0d9344;
}
.popup-para {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #4f4f4f;
}
.cross {
  font-size: 16px;
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>
