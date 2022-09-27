<template>
  <div
    class="modal fade"
    id="tipsModal"
    tabindex="-1"
    aria-labelledby="tipsModalLabel"
    aria-hidden="true"
    v-if="popup_component && isVisible('question-create')"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tipsModalLabel">Useful Tips</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <pop-up />
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Close
          </button>
        </div> -->
      </div>
    </div>
  </div>
  <div class="custom-main-content">
    <div class="content-action">
      <button class="btn btn-ac" @click="nextComponent('question-list')">
        <i class="fa-solid fa-bars"></i>
        Question List
      </button>
      <button
        class="btn useful-tips-button"
        data-bs-toggle="modal"
        data-bs-target="#tipsModal"
        @click="popupComponentShow()"
      >
        Useful Tips
      </button>
    </div>
    <div style="display: flex; justify-content: center">
      <div class="main-content">
        <div class="question_type">
          <div>
            <label class="labels">Question type</label>
          </div>
          <div class="form-check-div">
            <div class="form-check">
              <input
                type="radio"
                id="question_type-1"
                value="checkbox"
                ref="question_type_1"
                name="question_type"
                v-model="question_type"
                checked
              />
              <label class="form-check-label" for="defaultCheck1">
                Multiple Choice
              </label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                id="question_type-2"
                value="truefalse"
                ref="question_type_2"
                name="question_type"
                v-model="question_type"
              />
              <label class="form-check-label" for="defaultCheck2">
                True/ False
              </label>
            </div>
          </div>
        </div>
        <div class="select_topic">
          <div>
            <label class="labels">Select Topic</label>
          </div>
          <div class="select_tag">
            <!-- <Multiselect
                      mode="tags"
                      v-model="selected_tag"
                      :close-on-select="true"
                      :options="category_name"
                      :searchable="true"
                      placeholder="Select Tag"
                    /> -->
            <MultipleSelect
              v-model="selected_tag"
              :options="category_name"
              placeholder="Select Tags"
              filter="true"
              display="chip"
            />
          </div>
        </div>

        <div class="question">
          <div class="question_label">
            <div class="question_num">{{ question_no }}.</div>
            <!-- <div>
              <label class="labels">Questions*</label>
            </div> -->
            <div class="question_area">
              <quill-editor
                :options="editorOption"
                v-model:value="question_value"
                class="textarea_editor"
              />
            </div>
          </div>
          <!-- <div class="question_area">
            <quill-editor
              :options="editorOption"
              v-model:value="question_value"
              class="textarea_editor"
            />
          </div> -->
        </div>
        <div class="option-area" v-if="question_type == 'checkbox'">
          <div
            class="option"
            v-for="(option, index) in option_arr"
            :key="option"
          >
            <div class="option-label-1">
              <input
                v-model="multiple_qus_ans"
                class="form-check-input"
                type="checkbox"
                :value="index + 1"
                id="multiple_qus_ans"
              />
            </div>
            <div class="option-label-2">
              <div class="colName">{{ colName(index) }}</div>
            </div>
            <div class="option-input-div" v-if="option.open_input">
              <input v-model="option.value" class="input-field" type="text" />
              <div class="icon_div">
                <img
                  src="../../assets/images/question/Text.svg"
                  alt=""
                  class="image-margin"
                  @click="editor(index)"
                />
                <img
                  src="../../assets/images/question/Picture.svg"
                  @click="image(index)"
                  class="second_image"
                  alt=""
                />
              </div>
            </div>

            <div v-if="option.open_editor" class="option_editor">
              <quill-editor
                v-model:value="option.value"
                :options="editorOption"
                class="textarea_editor option_textarea-editor"
              />
            </div>
            <div
              v-if="option.open_editor"
              style="margin-left: 5px; margin-top: 8px"
            >
              <img
                src="../../assets/images/question/Input.svg"
                alt=""
                class="image-margin"
                @click="input(index)"
              />
              <img
                src="../../assets/images/question/Picture.svg"
                @click="image(index)"
                class="second_image"
                alt=""
              />
            </div>
            <div v-if="option.open_image" class="image-div">
              <input
                type="file"
                ref="file"
                @change="handleFileUpload(index, $event)"
                name="image"
                class="image form-control"
              />
            </div>
            <div
              class="image_preview_div text-center"
              v-if="option.image_preview_div"
              :id="option.id"
            >
              <p id="image-preview-para" class="image-preview-para">
                Image Preview
              </p>
              <!-- <img :id="option.id" alt="image" /> -->
            </div>
            <div
              v-if="option.open_image"
              style="margin-left: 5px; margin-top: 5px"
            >
              <img
                src="../../assets/images/question/Input.svg"
                alt=""
                class="image-margin"
                @click="input(index)"
              />
              <img
                src="../../assets/images/question/Text.svg"
                alt=""
                class="second_image"
                @click="editor(index)"
              />
            </div>
            <div class="cross-div">
              <i
                class="fa-solid fa-xmark text-danger cross"
                @click="del_option(index)"
              ></i>
            </div>
          </div>
        </div>

        <!-- <div>
          <div>{{ option_arr }}</div>
        </div> -->

        <div class="option-area" v-if="question_type == 'truefalse'">
          <div class="option">
            <div class="option-label-1">
              <input
                checked
                v-model="true_false_qus_ans"
                class="form-check-input"
                type="radio"
                value="1"
                name="true_false_qus"
              />
            </div>
            <div class="option-label-2">
              <div class="colName">A</div>
            </div>
            <div class="option-input-div">
              <input class="input-field" value="True" disabled type="text" />
            </div>
          </div>
          <div class="option">
            <div class="option-label-1">
              <input
                v-model="true_false_qus_ans"
                class="form-check-input"
                type="radio"
                value="2"
                name="true_false_qus"
              />
            </div>
            <div class="option-label-2">
              <div class="colName">B</div>
            </div>
            <div class="option-input-div">
              <input class="input-field" value="False" disabled type="text" />
            </div>
          </div>
        </div>

        <!-- <div>{{ true_false_qus_ans }}</div> -->

        <div class="ans_add" v-if="question_type == 'checkbox'">
          <button class="btn add_ans_btn" @click="add_option()">
            <i class="fa-solid fa-plus plus-icon text-success"></i>
            <span class="add_ans_text">Add Answer</span>
          </button>
        </div>
        <div class="save_next">
          <div class="save_button_div">
            <button class="btn save_button" @click="add_question()">
              Save
            </button>
          </div>
          <div class="next_button_div">
            <button class="btn next_button" @click="add_question_with_next()">
              Save & Next
            </button>
          </div>
        </div>
        <!-- {{ option_arr }} -->
      </div>
      <!--main-content-->
    </div>
    <!-- question create property-->
  </div>
  <!---custom-main-content-->
  <div class="">
    <div
      class="rhombus"
      :class="{ bgWhite: !rightSidebarStatus }"
      @click="toggleRightSidebar()"
    >
      <i
        class="fa fa-chevron-left"
        :class="{ hide: rightSidebarStatus }"
        aria-hidden="true"
      ></i>
      <i
        class="fa fa-chevron-right"
        :class="{ hide: !rightSidebarStatus }"
        aria-hidden="true"
      ></i>
    </div>
  </div>
  <!---arrow box-->
  <div class="right-sidebar" :class="{ hide: !rightSidebarStatus }">
    <h4>Useful Tips</h4>
    <p>You can create Both multiple & true false question.</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit eget
      malesuada enim enim. Mattis
    </p>
    <h4>Related Tasks</h4>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit eget
      malesuada enim enim. Mattis
    </p>
    <h4>Import Questions</h4>
    <p>Lorem ipsum dolar</p>
  </div>
  <!---right sidebar-->
</template>
<script>
// import Multiselect from "@vueform/multiselect";
import MultipleSelect from "primevue/multiselect";
import axios from "axios";
import PopUp from "./PopUp.vue";
import { quillEditor, Quill } from "vue3-quill";
import BlotFormatter from "quill-blot-formatter";
const ImageDrop = require("quill-image-drop-module").ImageDrop;
import ImageUploader from "quill-image-uploader";
import { mapActions, mapGetters } from "vuex";

Quill.register({
  // "modules/imageResize": ImageResize,
  "modules/imageDrop": ImageDrop,
  "modules/blotFormatter": BlotFormatter,
  "modules/imageUploader": ImageUploader,
});

export default {
  components: {
    quillEditor,
    // Multiselect,
    MultipleSelect,
    PopUp,
  },
  data() {
    return {
      editorOption: {
        placeholder: "Write Something",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "image", "video"], // toggled buttons
            // ["blockquote", "code-block", "strike"],

            // [{ header: 1 }, { header: 2 }], // custom button values
            // [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            // [{ direction: "rtl" }], // text direction

            // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            // [{ header: [1, 2, 3, 4, 5, 6, false] }],

            // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            // [{ font: [] }],
            // [{ align: [] }],

            // ["clean"], // remove formatting button
          ],
          // other moudle options here
          // imageDrop: true,
          // imageResize: {},
          blotFormatter: {
            // see config options below
          },
          imageUploader: {
            upload: (file) => {
              var data = new FormData();

              data.append("image", file);

              // axios
              //   .post(`http://localhost:8000/api/image-upload`, data)
              //   .then(() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  axios
                    .post(`http://localhost:8000/api/image-upload`, data)
                    .then((res) => {
                      resolve(`${res.data.base_url}/${res.data.img_url}`);
                    });
                }, 0);
              });
              // console.log(res);
              // });
            },
          },
        },
        // more options
      },

      token: "",
      question_no: 1,
      selected_tag: [],
      question_type: "checkbox",
      question_value: "",
      option_no: 4,
      multiple_qus_ans: [],
      true_false_qus_ans: 1,
      category: [],
      category_name: [],
      option_text: [],
      option_true_false: ["True", "False"],
      popup_component: false,
      option_arr: [
        {
          id: "option_1",
          value: "",
          open_image: false,
          open_editor: false,
          open_input: true,
          image_preview_div: false,
        },
        {
          id: "option_2",
          value: "",
          open_image: false,
          open_editor: false,
          open_input: true,
          image_preview_div: false,
        },
        {
          id: "option_3",
          value: "",
          open_image: false,
          open_editor: false,
          open_input: true,
          image_preview_div: false,
        },
        {
          id: "option_4",
          value: "",
          open_image: false,
          open_editor: false,
          open_input: true,
          image_preview_div: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["rightSidebarStatus", "currentComponent"]),
  },
  methods: {
    ...mapActions(["updateCurrentComponent", "toggleRightSuggestionSidebar"]),
    toggleRightSidebar() {
      this.toggleRightSuggestionSidebar();
      return;
    },
    isVisible(componentName) {
      return componentName == this.currentComponent;
    },
    nextComponent(name) {
      this.updateCurrentComponent(name);
      return;
    },
    popupComponentShow() {
      this.popup_component = !this.popup_component;
    },
    colName(n) {
      var ordA = "a".charCodeAt(0);
      var ordZ = "z".charCodeAt(0);
      var len = ordZ - ordA + 1;

      var s = "";
      while (n >= 0) {
        s = String.fromCharCode((n % len) + ordA) + s;
        n = Math.floor(n / len) - 1;
      }
      return s.toUpperCase();
    },
    add_option() {
      this.option_no++;
      this.option_arr.push({
        id: "option_" + this.option_no,
        value: "",
        open_image: false,
        open_editor: false,
        open_input: true,
        image_preview_div: false,
      });
    },
    del_option(position) {
      // let checkboxs = document.querySelectorAll("#multiple_qus_ans");
      // console.log(checkboxs);
      // checkboxs[position].checked = false;
      // let unchecked_value = position + 1;
      // var index = this.multiple_qus_ans.indexOf(unchecked_value);
      // alert(index);
      // this.multiple_qus_ans.splice(index, 1);
      this.multiple_qus_ans = [];
      if (this.option_arr.length > 2) {
        this.option_arr.splice(position, 1);
      }

      // this.option_no--;
    },
    editor(i) {
      this.option_arr[i].open_editor = true;
      this.option_arr[i].open_input = false;
      this.option_arr[i].open_image = false;
      this.option_arr[i].image_preview_div = false;
    },
    image(i) {
      this.option_arr[i].open_image = true;
      this.option_arr[i].open_editor = false;
      this.option_arr[i].open_input = false;
      this.option_arr[i].image_preview_div = true;
    },
    input(i) {
      this.option_arr[i].open_editor = false;
      this.option_arr[i].open_image = false;
      this.option_arr[i].open_input = true;
      this.option_arr[i].image_preview_div = false;
    },
    // login() {
    //   let data = {
    //     username: "Admin",
    //     password: "123456789",
    //   };

    //   axios
    //     .post(`http://localhost:8000/api/v1/login`, data)
    //     .then((response) => {
    //       let token = response.data.token;
    //       this.token = token;
    //       // console.log(token);
    //       let userInfo = response.data.user;
    //       localStorage.setItem("auth-token", token);
    //       localStorage.setItem("user-info", JSON.stringify(userInfo));
    //       // console.log(userInfo);
    //     });
    // },

    getCategory() {
      // debugger
      // let token = localStorage.getItem("auth-token");
      // console.log(token,'token')
      // let token = this.token;
      let token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNjZhZmYxZjc1MTllZTBjMDNiM2NiZDU3YWRlYWY4MmEyZmJjY2FkNTZmMDg4NGNiMDhmNzU5NWY4MzhkNjdmYmQ3ZjkwYjA3ZTVjZmIxMTYiLCJpYXQiOjE2NjM1Njk4NzMuOTk0NjM0LCJuYmYiOjE2NjM1Njk4NzMuOTk0NjM5LCJleHAiOjE2OTUxMDU4NzMuOTEyNTAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WYyk9Id6Cn7mc7I9pKziZ-kNFC-m7cieI53jI26-gWBfwxEnaAxCFaAzgirU-NEIk6qvGcSAD_Qg8EGfjC_Nkm-D3aJK5BB6OSsSc9Oac85DgixdpmuSkdMHuXvS6XXzJCW-L3RBqBMkdHBEUSFp_PRp1KRDqsTvL1fadNn6gGIXaCU8cCfP1V0Vr1U3qUpnhcLvX5AilCrV-KwTI3xPW7egkluyjkJ5BHIkwSg3tg89SYu6i2VycQQAWhwftLrPCIOhs1kdC0pCoo0LscsUiFsXCECYe0bNk9_pVMYV8RnSn0nO53whu4b4pOxhaTYgVpsDzNWWj-FU_B9WjRmqYItsAe_gXzSkj5vYgSwl6atWBcaUtsq37H6zmPuTMIget3UBMYEZkYKDPFyGKY9uFOdbNZVpCmpajF1NYGk_AHPvoXex5bTZU8TdkuUfgyNAqOPfxUVfrSxgCKGQ8fCnfKdPAV3-d3_O4bSe2NcNL7q1tj1JO4e-90tJAtoNg7N20EPJvaa3oTmZ8aSJ0C5LdFAI8Onh4eHy3NA6sJ_pbM7feVJC61g-DBpxIy9jSLDHgoVsxThs9fAO5uid8ylhloy1nMOC-Ej29WR-QXDVDXQoxiBlA_RGEjeHpJSm1filv90bIn67Jav8f6xBH9DYLIkJkqmA8ufJ-apSttL7V2I";
      var BASE_URL = "http://localhost:8000/api/v1";
      var ENDPOINT = "question-categories";
      axios
        .create({
          baseURL: BASE_URL,
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .get(ENDPOINT)
        .then((res) => {
          console.log(res);
          this.category = res.data.question_categories;
          for (let i = 0; i < this.category.length; i++) {
            this.category_name.push(this.category[i].name);
          }
        });

      // axios
      //   .get("http://localhost:8000/api/v1/question-categories", {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   })
      //   .then((response) => {
      //     // this.comments = response.data;

      //     console.log(response.data);
      //   });
    },
    handleFileUpload(position, e) {
      var file = e.target.files[0];
      var data = new FormData();
      data.append("image", file);
      axios.post(`http://localhost:8000/api/image-upload`, data).then((res) => {
        this.option_arr[
          position
        ].value = `<p><img src="${res.data.base_url}/${res.data.img_url}"></p>`;

        //   document
        //     .getElementById(this.option_arr[position].id)
        //     .setAttribute("src", URL.createObjectURL(file));
        // });
        // this.option_arr[position].image_preview_div = true;
        var para = document.getElementById("image-preview-para");
        document.getElementById(this.option_arr[position].id).removeChild(para);
        var image = document.createElement("img");
        image.setAttribute("src", URL.createObjectURL(file));
        image.setAttribute("height", "60");
        image.setAttribute("width", "60");
        image.setAttribute("alt", "image");

        document
          .getElementById(this.option_arr[position].id)
          .appendChild(image);
      });
    },
    add_question() {
      let question_type = this.question_type;
      console.log(question_type);

      // For Tag
      let original_tag = [];
      for (let i = 0; i < this.category.length; i++) {
        for (let j = 0; j < this.selected_tag.length; j++) {
          if (this.category[i].name == this.selected_tag[j]) {
            original_tag.push(this.category[i].id);
          }
        }
      }

      // For Serial No
      let serial_no = "";
      for (let i = 1; i <= this.option_arr.length; i++) {
        if (i == 1) {
          serial_no = serial_no + "" + i;
        } else {
          serial_no = serial_no + "|" + i;
        }
      }

      for (let i = 0; i < this.option_arr.length; i++) {
        this.option_text.push(this.option_arr[i].value);
      }

      let data;

      if (question_type == "checkbox") {
        data = {
          question_type: this.question_type,
          question_text: this.question_type,
          option_type: this.question_type,
          profile_id: 1,
          category_id: 1,
          privacy: 0,
          publish_status: 0,
          no_of_option: this.option_arr.length,
          no_of_used: 0,
          no_of_comments: 0,
          average_rating: 0,
          no_of_answer: this.multiple_qus_ans.length,
          active: 0,
          serial_no: serial_no,
          option: this.option_text,
          description: this.question_value,
          img: "img",
          answer: this.multiple_qus_ans.join(","),
          reference: 0,
          tags: original_tag.join(","),
        };
        console.log(data);
      }

      if (question_type == "truefalse") {
        data = {
          question_type: this.question_type,
          question_text: this.question_type,
          option_type: this.question_type,
          profile_id: 1,
          category_id: 1,
          privacy: 0,
          publish_status: 0,
          no_of_option: 2,
          no_of_used: 0,
          no_of_comments: 0,
          average_rating: 0,
          no_of_answer: 1,
          active: 0,
          serial_no: "1|2",
          option: this.option_true_false,
          description: this.question_value,
          img: "img",
          answer: this.true_false_qus_ans,
          reference: 0,
          tags: original_tag.join(","),
        };
        console.log(data);
      }
      let token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNjZhZmYxZjc1MTllZTBjMDNiM2NiZDU3YWRlYWY4MmEyZmJjY2FkNTZmMDg4NGNiMDhmNzU5NWY4MzhkNjdmYmQ3ZjkwYjA3ZTVjZmIxMTYiLCJpYXQiOjE2NjM1Njk4NzMuOTk0NjM0LCJuYmYiOjE2NjM1Njk4NzMuOTk0NjM5LCJleHAiOjE2OTUxMDU4NzMuOTEyNTAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WYyk9Id6Cn7mc7I9pKziZ-kNFC-m7cieI53jI26-gWBfwxEnaAxCFaAzgirU-NEIk6qvGcSAD_Qg8EGfjC_Nkm-D3aJK5BB6OSsSc9Oac85DgixdpmuSkdMHuXvS6XXzJCW-L3RBqBMkdHBEUSFp_PRp1KRDqsTvL1fadNn6gGIXaCU8cCfP1V0Vr1U3qUpnhcLvX5AilCrV-KwTI3xPW7egkluyjkJ5BHIkwSg3tg89SYu6i2VycQQAWhwftLrPCIOhs1kdC0pCoo0LscsUiFsXCECYe0bNk9_pVMYV8RnSn0nO53whu4b4pOxhaTYgVpsDzNWWj-FU_B9WjRmqYItsAe_gXzSkj5vYgSwl6atWBcaUtsq37H6zmPuTMIget3UBMYEZkYKDPFyGKY9uFOdbNZVpCmpajF1NYGk_AHPvoXex5bTZU8TdkuUfgyNAqOPfxUVfrSxgCKGQ8fCnfKdPAV3-d3_O4bSe2NcNL7q1tj1JO4e-90tJAtoNg7N20EPJvaa3oTmZ8aSJ0C5LdFAI8Onh4eHy3NA6sJ_pbM7feVJC61g-DBpxIy9jSLDHgoVsxThs9fAO5uid8ylhloy1nMOC-Ej29WR-QXDVDXQoxiBlA_RGEjeHpJSm1filv90bIn67Jav8f6xBH9DYLIkJkqmA8ufJ-apSttL7V2I";
      // var BASE_URL = 'http://localhost:8002/api/v1'
      // var ENDPOINT = 'questions'

      const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      };
      axios
        .post("http://localhost:8000/api/v1/questions", data, { headers })
        .then((response) => {
          console.log(response);
          this.selected_tag = [];
          this.question_value = "";
          this.multiple_qus_ans = [];
          this.true_false_qus_ans = 1;
          this.option_arr = [
            {
              id: "option_1",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
            {
              id: "option_2",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
            {
              id: "option_3",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
            {
              id: "option_4",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
          ];
          this.visibleComponent = "question-list";
        });
    },
    add_question_with_next() {
      let question_type = this.question_type;
      console.log(question_type);

      // For Tag
      let original_tag = [];
      for (let i = 0; i < this.category.length; i++) {
        for (let j = 0; j < this.selected_tag.length; j++) {
          if (this.category[i].name == this.selected_tag[j]) {
            original_tag.push(this.category[i].id);
          }
        }
      }

      // For Serial No
      let serial_no = "";
      for (let i = 1; i <= this.option_arr.length; i++) {
        if (i == 1) {
          serial_no = serial_no + "" + i;
        } else {
          serial_no = serial_no + "|" + i;
        }
      }

      for (let i = 0; i < this.option_arr.length; i++) {
        this.option_text.push(this.option_arr[i].value);
      }

      let data;

      if (question_type == "checkbox") {
        data = {
          question_type: this.question_type,
          question_text: this.question_type,
          option_type: this.question_type,
          profile_id: 1,
          category_id: 1,
          privacy: 0,
          publish_status: 0,
          no_of_option: this.option_arr.length,
          no_of_used: 0,
          no_of_comments: 0,
          average_rating: 0,
          no_of_answer: this.multiple_qus_ans.length,
          active: 0,
          serial_no: serial_no,
          option: this.option_text,
          description: this.question_value,
          img: "img",
          answer: this.multiple_qus_ans.join(","),
          reference: 0,
          tags: original_tag.join(","),
        };
        console.log(data);
      }

      if (question_type == "truefalse") {
        data = {
          question_type: this.question_type,
          question_text: this.question_type,
          option_type: this.question_type,
          profile_id: 1,
          category_id: 1,
          privacy: 0,
          publish_status: 0,
          no_of_option: 2,
          no_of_used: 0,
          no_of_comments: 0,
          average_rating: 0,
          no_of_answer: 1,
          active: 0,
          serial_no: "1|2",
          option: this.option_true_false,
          description: this.question_value,
          img: "img",
          answer: this.true_false_qus_ans,
          reference: 0,
          tags: original_tag.join(","),
        };
        console.log(data);
      }
      let token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNjZhZmYxZjc1MTllZTBjMDNiM2NiZDU3YWRlYWY4MmEyZmJjY2FkNTZmMDg4NGNiMDhmNzU5NWY4MzhkNjdmYmQ3ZjkwYjA3ZTVjZmIxMTYiLCJpYXQiOjE2NjM1Njk4NzMuOTk0NjM0LCJuYmYiOjE2NjM1Njk4NzMuOTk0NjM5LCJleHAiOjE2OTUxMDU4NzMuOTEyNTAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WYyk9Id6Cn7mc7I9pKziZ-kNFC-m7cieI53jI26-gWBfwxEnaAxCFaAzgirU-NEIk6qvGcSAD_Qg8EGfjC_Nkm-D3aJK5BB6OSsSc9Oac85DgixdpmuSkdMHuXvS6XXzJCW-L3RBqBMkdHBEUSFp_PRp1KRDqsTvL1fadNn6gGIXaCU8cCfP1V0Vr1U3qUpnhcLvX5AilCrV-KwTI3xPW7egkluyjkJ5BHIkwSg3tg89SYu6i2VycQQAWhwftLrPCIOhs1kdC0pCoo0LscsUiFsXCECYe0bNk9_pVMYV8RnSn0nO53whu4b4pOxhaTYgVpsDzNWWj-FU_B9WjRmqYItsAe_gXzSkj5vYgSwl6atWBcaUtsq37H6zmPuTMIget3UBMYEZkYKDPFyGKY9uFOdbNZVpCmpajF1NYGk_AHPvoXex5bTZU8TdkuUfgyNAqOPfxUVfrSxgCKGQ8fCnfKdPAV3-d3_O4bSe2NcNL7q1tj1JO4e-90tJAtoNg7N20EPJvaa3oTmZ8aSJ0C5LdFAI8Onh4eHy3NA6sJ_pbM7feVJC61g-DBpxIy9jSLDHgoVsxThs9fAO5uid8ylhloy1nMOC-Ej29WR-QXDVDXQoxiBlA_RGEjeHpJSm1filv90bIn67Jav8f6xBH9DYLIkJkqmA8ufJ-apSttL7V2I";
      // var BASE_URL = 'http://localhost:8002/api/v1'
      // var ENDPOINT = 'questions'

      const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      };
      axios
        .post("http://localhost:8000/api/v1/questions", data, { headers })
        .then((response) => {
          console.log(response);
          this.question_no++;
          this.question_type = "checkbox";
          this.selected_tag = [];
          this.question_value = "";
          this.multiple_qus_ans = [];
          this.true_false_qus_ans = 1;
          this.option_arr = [
            {
              id: "option_1",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
            {
              id: "option_2",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
            {
              id: "option_3",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
            {
              id: "option_4",
              value: "",
              open_image: false,
              open_editor: false,
              open_input: true,
              image_preview_div: false,
            },
          ];
        });
    },
  },
  mounted() {
    // this.login();
    // debugger
    this.getCategory();
    // if (localStorage.getItem("auth-token") != null) {
    //   this.getCategory();
    // }
    // console.log(localStorage.getItem("auth-token"));
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css">
</style>
<style scoped>
.main-content {
  display: block;
  margin-top: -40px;
  width: 55%;
}
#qButton {
  background-color: #045692;
  color: white;
  font-size: 14px;
  font-weight: 600;
}
.container {
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
/* .main-content { */
/* margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column; */
/* width: 35%;
  margin: 50px auto; */
/* } */
.labels {
  font-size: 16px;
  font: 400;
}
.question_type {
  display: flex;
  margin-left: 50px;
}
.form-check:not(:last-child) {
  margin-right: 15px;
}

.option-area {
  margin-top: 20px;
}
.option:not(:last-child) {
  margin-bottom: 15px;
}
.ans_add {
  margin-top: 15px;
  margin-left: 37px;
}
.form-check-label {
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
}
.question_type_label {
  font-size: 16px;
  font-weight: 400;
}

#qListButton {
  padding-top: 20px;
  padding-left: 38px;
}
.select_topic {
  display: flex;
  justify-content: flex-start;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 50px;
}
.select_tag {
  margin-left: 35px;
}
.textarea_editor {
  background-color: white;
}
.question_area {
  background-color: white;
  margin-top: 10px;
  /* margin-left: 51px; */
}

.question_num {
  margin-right: 38px;
}
.question_label {
  display: flex;
}
.option {
  display: flex;
}
.option-label-1 {
  margin-right: 11px;
  margin-left: -4px;
  margin-top: 7px;
}
.option-label-2 {
  margin-right: 10px;
  margin-top: 7px;
  height: 5px;
  width: 20px;
  text-align: center;
}
.option-label-2 div {
  background-color: #e6d5e1;
  border-radius: 50%;
}
.option-input-div {
  display: flex;
  position: relative;
  width: 500px;
}
.icon_div {
  position: absolute;
  right: 0;
  top: 5px;
  /* margin:auto; */
  margin-right: 5px;
}

.input-field {
  width: 100%;
  padding: 5px;
  border: 1px solid #cccccc;
}
.cross-div {
  margin-left: 10px;
  margin-top: 7px;
}
.cross {
  font-size: 18px;
}
.option {
  margin: 10px 0px;
}
.plus-icon {
  font-size: 18px;
  margin-right: 15px;
}
.add_ans_text {
  font-size: 16px;
  font-weight: 600;
}
.option-button {
  outline: none;
  border-radius: 50%;
  background-color: #e6d5e1;
}
/* .save_button {
  background-color: #045692;
  color: white;
} */
.save_next {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  margin-right: 20px;
}
.next_button {
  background-color: #045692;
  color: white;
  margin-left: 15px;
  border: 1px solid black;
}

.save_button {
  color: black;
  border: 1px solid black;
}

.image {
  width: 100%;
}
.image_preview_div {
  margin-left: 10px;
  height: 60px;
  width: 60px;
}
.image_preview_div img {
  height: 100%;
  width: 100%;
}
.upper_portion_div {
  margin-top: -15px;
  margin-bottom: 10px;
}
.upper_portion {
  font-size: 16px;
}
.first_upper_portion {
  font-weight: 600;
  margin-right: 25px;
}
.second_upper_portion {
  font-weight: 400;
}
.main-container {
  /* height: 83vh; */
  padding-bottom: 1.2rem;
}
/* .multiselect-tag-remove {
  border: 1px solid black;
  border-radius: 50%;
  width: 15px;
  height: 15px;
}
.multiselect-tag-remove-icon {
  color: red !important;
} */
/* .multi-select{
  background-color: red!important;;
} */
.btn {
  box-shadow: none;
}
.form-check-input {
  box-shadow: none;
}
.bgWhite {
  background: #ffffff !important;
  margin-left: -15px !important;
}
.rhombus {
  position: absolute;
  width: 42px;
  height: 44px;
  border-radius: 50%;
  font-size: 16px;
  background-color: #f6f7fb;
  /* color:#f1f1f2; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* top:calc(100px - 22px); */
  margin-top: 100px;
  /* left:calc(100% - 22px); */
  margin-left: -30px;
  z-index: 3;
  cursor: pointer;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.fa-chevron-left {
  padding-right: 21px;
}
.fa-chevron-right {
  margin-left: 24px;
}
.hide {
  display: none;
}

.right-arrow {
  margin-top: 88px;
}
.question-create {
  display: flex;
}

.form-check-div {
  display: flex;
}

.right-sidebar {
  width: 20%;
  background-color: #ffffff;
  height: 100%;
  margin-left: 16px;
  padding: 0 16px 16px 16px;
}
.right-sidebar h4 {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #0d9344;
}
.right-sidebar p {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #4f4f4f;
}
/* made changes */
.content-action {
  position: relative;
  margin: 0px;
}
.useful-tips-button {
  position: absolute;
  right: 0;
  top: 4px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #0d9344;
  display: none;
}
.custom-main-content {
  min-height: 80vh;
  /* min-height: 100%; */
  background: #f6f7fb;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 20px 38px;
}
.container {
  margin: 0;
  padding: 0;
  max-width: 100%;
  /* background-color:blue; */
  /* height: auto; */
}
.sub-menu {
  color: #0000;
  height: 2rem;
}
.sub-menu ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.sub-menu li {
  padding: 0;
  margin: 0 52px 0 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400px;
  color: #828282;
}
.sub-menu li:hover {
  font-size: 16px;
  font-weight: 400px;
  color: #696767e3;
}
.btn-ac {
  background: #045692;
  width: 152px;
  height: 40px;
  border-radius: 0;
  color: #ffffff;
  font-size: 14px;
}
.btn-ac:hover {
  background: #045692;
  width: 152px;
  height: 40px;
  font-size: 14.5px;
  border-radius: 0;
  color: #ffffff;
}
.action-right-sidebar {
  padding: 100px 0 0 0;
}

#qButton {
  background-color: #045692;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 0px;
  padding: 10px 20px 10px 20px;
}
/* container of content */

.container-class {
  /* margin-top: 50px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  /* background-color: red; */
  /* flex-shrink: 1;
  flex-basis: 100%; */
}

.labels {
  font-size: 16px;
  font: 400;
}
.question_type {
  display: flex;
  margin-left: 50px;
}
.form-check:not(:last-child) {
  margin-right: 15px;
}

/* option area */

.option-area {
  margin-top: 12px;
}
.option:not(:last-child) {
  margin-bottom: 10px;
}
.ans_add {
  /* margin-top: 10px; */
  margin-left: 37px;
}
.form-check-label {
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
}
.question_type_label {
  font-size: 16px;
  font-weight: 400;
}

#qListButton {
  padding-top: 7px;
  padding-left: 28px;
}
/* tag section */
.select_topic {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 50px;
}
.select_tag {
  margin-left: 35px;
  width: 76.5%;
}

/* tag section */
.textarea_editor {
  background-color: white;
  height: 70%;
}
/* .question_area {
  background-color: white;
  margin-top: 5px;
  margin-left: 51px;
  width: 500px;
} */
.question_area {
  background-color: white;
  margin-top: 5px;
  /* margin-left: 2px; */
  /* width: 500px; */
  width: 87%;
  min-height: 130px;
}

.question_num {
  /* margin-right: 39px; */
  margin-right: 40px;
}
.question_label {
  display: flex;
}

/* newly added */
.option {
  display: flex;
  width: 100%;
}
.option-label-1 {
  margin-right: 11px;
  margin-left: -4px;
  margin-top: 10px;
}
.option-label-2 {
  margin-right: 10px;
  margin-top: 10px;
  height: 5px;
  width: 20px;
  text-align: center;
}
.option-label-2 div {
  background-color: #d9d9d9;
  border-radius: 50%;
}
.option-input-div {
  display: flex;
  position: relative;
  width: 87%;
}

.icon_div {
  position: absolute;
  right: 0;
  top: 8px;
  /* margin:auto; */
  margin-right: 5px;
}

/* .image-margin {
  margin-right: 10px;
} */
.image-margin {
  margin-right: 5px;
  width: 20px;
}
.second_image {
  width: 20px;
}

.input-field {
  width: 100%;
  padding: 5px;
  height: 40px;
  border: 1px solid #cccccc;
}
.cross-div {
  margin-left: 5px;
  margin-top: 10px;
}
.cross {
  font-size: 18px;
}
.option {
  margin: 10px 0px;
}
.plus-icon {
  font-size: 15px;
  margin-right: 15px;
}
.add_ans_text {
  font-size: 16px;
  font-weight: 600;
}
.option-button {
  outline: none;
  border-radius: 50%;
  background-color: #e6d5e1;
}
/* .save_button {
  background-color: #045692;
  color: white;
} */
.save_next {
  display: flex;
  justify-content: flex-end;
  /* margin-top: 10px; */
  margin-right: 57px;
}
.next_button {
  background-color: #045692;
  color: white;
  margin-left: 15px;
  padding: 10px 20px 10px 20px;
  border-radius: 0px;
  /* border: 1px solid black; */
}

.save_button {
  color: #284064;
  border: 1px solid #045692;
  padding: 10px 20px 10px 20px;
  border-radius: 0px;
}

.image-div {
  width: 72.5%;
}
.image_preview_div {
  margin-left: 5px;
  height: 60px;
  width: 60px;
  border: 1px dotted rgb(176, 169, 169);
}
.image-preview-para {
  margin: 5px;
  color: #045692;
  font-size: 12px;
}

/* .image_preview_div img {
  height: 100%;
  width: 100%;
} */
/* upper portion */

.upper_portion_div {
  margin-top: -25px;
  margin-bottom: 5px;
}
.upper_portion {
  font-size: 16px;
}
.first_upper_portion {
  font-weight: 600;
  margin-right: 25px;
}
.second_upper_portion {
  font-weight: 400;
}

/* upper portion */
.main-container {
  height: 86vh;
  background-color: #f6f7fb;
  /* width:90% ; */
  /* padding-bottom: 1.5rem; */
  /* padding-bottom: 5px; */
}

.option_editor {
  width: 80%;
  min-height: 130px;
}
.add_ans_btn {
  outline: none !important;
  border: none !important;
}
.add_ans_btn:focus {
  outline: none !important;
  border: none !important;
}
.popup-component-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  top: -15px;
}
.modal-title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #0d9344;
}

/* question-list */

/* .question-list-container {
  margin-top: 15px;
} */

/* .question-list-card {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
} */

/* .card {
  width: 430px;
  border-radius: 0px !important;
} */

.question-tag-div {
  padding: 10px 10px;
  margin-bottom: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.question-with-option-div {
  padding: 5px 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  max-height: 220px;
  overflow: auto;
}
.option-div {
  margin-top: 20px;
}
.question-div {
  display: flex;
}

/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #1381e7 white;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: white;
}

*::-webkit-scrollbar-thumb {
  background-color: #1381e7;

  /* border-radius: 20px; */
  border: 3px solid white;
  /* border-color: white;
  border-style: solid;
  border-width: 85px 3px 65px 3px; */
}

/* .multiselect-tag-remove {
  border: 1px solid black;
  border-radius: 50%;
  width: 15px;
  height: 15px;
} */

/* .multiselect-tag-remove-icon {
  background-color: red !important;
}
.multiselect-tag{
  background: #196C66!important;
}
.multiselect-green {
  --ms-tag-bg: #D1FAE5;
  --ms-tag-color: #196C66!important;
} */
/* var(--ms-tag-bg,#196C66) */
@media only screen and (max-width: 1650px) {
  .select_tag {
    width: 74.5%;
  }
}
@media only screen and (max-width: 1550px) {
  .select_tag {
    width: 73%;
  }
}
@media only screen and (max-width: 1440px) {
  .save_next {
    margin-right: 25px;
  }
  .option_editor {
    width: 78%;
  }
  .image-div {
    width: 67.5%;
  }
  .select_tag {
    width: 72%;
  }
}
@media only screen and (max-width: 1366px) {
  .option_editor {
    width: 77.5%;
  }
  .image-div {
    width: 65.5%;
  }
  .labels {
    font-size: 14px;
  }
  .add_ans_text {
    font-size: 14px;
  }
  .plus-icon {
    font-size: 14px;
  }
  .upper_portion {
    font-size: 14px;
  }
  .main-container {
    height: auto;
    /* padding-bottom: 1.5rem; */
    padding-bottom: 8px;
  }
  .save_next {
    margin-right: 20px;
  }
  .useful-tips-button {
    font-size: 14px;
  }
}

@media only screen and (max-width: 1250px) {
  .main-content {
    width: 65%;
    margin-top: 10px;
  }
}
@media only screen and (max-width: 1057px) {
  .rhombus {
    display: none;
  }
  .right-sidebar {
    display: none;
  }
  .useful-tips-button {
    display: inline;
  }
  .main-content {
    width: 70%;
  }
}
@media only screen and (max-width: 820px) {
  .main-content {
    width: 90%;
  }
  .main-container {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 720px) {
  .option_editor {
    width: 75%;
  }
  .image-div {
    width: 61%;
  }
}
@media only screen and (max-width: 640px) {
  .main-content {
    width: 100%;
  }
  .custom-main-content {
    padding: 16px 14px;
  }

  .question_type {
    margin-left: 0px;
  }

  .select_topic {
    margin-left: 0px;
  }
  .question_num {
    margin-right: 10px;
  }
  .option-label-2 {
    display: none;
  }
  .ans_add {
    margin-left: 10px;
  }

  .save_next {
    margin-right: 48px;
  }
  .select_tag {
    margin-left: 17px;
    width: 70%;
  }

  .main-container {
    margin-top: 24px;
  }
}
@media only screen and (max-width: 500px) {
  .select_tag {
    width: 65%;
  }
  .save_next {
    margin-right: 32px;
  }
  .image-div {
    width: 57%;
  }
}

@media only screen and (max-width: 440px) {
  .form-check {
    padding-left: 10px;
  }
  .save_next {
    margin-top: 10px;
    margin-right: 25px;
  }
  .image-div {
    width: 52%;
  }
  .option_editor {
    width: 70%;
  }

  /* .form-check:not(:last-child) {
    margin-right: 10px;
} */
}
@media only screen and (max-width: 420px) {
  .form-check-div {
    flex-direction: column;
    margin-left: 5px;
  }
  .select_tag {
    width: 65%;
  }
}
@media only screen and (max-width: 400px) {
  .form-check-label {
    font-size: 14px;
    font-weight: 600;
  }
  .select_tag {
    width: 63%;
  }
}
@media only screen and (max-width: 364px) {
  .question_area {
    min-height: 130px;
  }
  .textarea_editor {
    height: 50%;
  }
  .select_tag {
    margin-left: 10px;
  }
}
@media only screen and (max-width: 350px) {
  .save_next {
    margin-right: 5px;
  }
  .option_editor {
    min-height: 175px;
  }
  .select_tag {
    width: 60%;
  }
}
@media only screen and (max-width: 325px) {
  .form-check-div {
    margin-left: 0px;
  }
  .btn-ac {
    width: 148px;
  }
}
</style>
