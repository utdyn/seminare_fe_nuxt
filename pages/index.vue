<template>
  <b-col cols="13" class="mb-3">
    <div class="bg-gradient">
      <b-container class="p-3 pb-6">
        <div class="space-between">
          <div>
            <row>
              <h1>Anmeldung Zur Herbsttagung 35.3</h1>
            </row>
            <h3>vom 18-20.11.2022</h3>
          </div>
          <div>
            <b-img :src="require('../assets/dve_logo.svg')" height="120" sizes="sm:100vw md:50vw lg:400px"> </b-img>
          </div>
        </div>
      </b-container>
    </div>
    <b-col cols="12">
      <b-card no-body>

        <b-collapse
          id="accordion-general"
          visible
          accordion="form-accordion"
          role="tabpanel"
        >
          <b-card-body v-if="step === 1">
            <b-card-text>
              <b-form novalidate>

                <div>
                  <b-form-group label="Anrede" v-slot="{ gender }">
                    <b-form-radio v-model="store.gender" :aria-describedby="gender" inline name="gender-radios" value="Herr">Herr</b-form-radio>
                    <b-form-radio v-model="store.gender" :aria-describedby="gender" inline name="gender-radios" value="Frau">Frau</b-form-radio>
                    <b-form-radio v-model="store.gender" :aria-describedby="gender" inline name="gender-radios" value="Keine">Keine</b-form-radio>
                  </b-form-group>
                </div>

                <b-form-group
                  id="input-group-name"
                  :state="errors.state_name"
                  :invalid-feedback="errors.error_name"
                  label="Name,Vorname:"
                  label-class="text-black"
                  label-for="input-name"
                >
                  <b-form-input
                    id="input-name"
                    v-model="store.name"
                    @update="checkName"
                    required
                    :state="errors.state_name"
                  ></b-form-input>
                </b-form-group>


                <b-form-group
                  id="input-group-geb"
                  :state="errors.state_geb"
                  :invalid-feedback="errors.error_geb"
                  label="Geb.-Datum:"
                  label-class="text-black"
                  label-for="input-geb"
                  description="Datum-Monate-Jahr"
                >
                  <b-form-input
                    id="input-geb"
                    v-model="store.geb"
                    @update="checkGeb"
                    required
                    :state="errors.state_geb"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-adresse"
                  :state="errors.state_address"
                  :invalid-feedback="errors.error_address"
                  label="Rechnungsadresse:"
                  label-class="text-black"
                  label-for="input-adresse"
                  description="Straße, Nr, PLZ, Ort, Bundesland"

                >
                  <b-form-input
                    id="input-adresse"
                    v-model="store.address"
                    @update="checkAddress"
                    required
                    :state="errors.state_address"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-telefon"
                  :state="errors.state_telephone"
                  :invalid-feedback="errors.error_telephone"
                  label="Telefon:"
                  label-class="text-black"
                  label-for="input-telefon"
                >
                  <b-form-input
                    id="input-telefon"
                    v-model="store.telephone"
                    @update="checkTelephone"
                    required
                    :state="errors.state_telephone"
                  ></b-form-input>
                </b-form-group>

                <div class="space-between">
                  <b-form-group label="Ich bin" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="store.memberquestion" :aria-describedby="ariaDescribedby" inline name="member-radios" value="keine">kein Mitgelied</b-form-radio>
                    <b-form-radio v-model="store.memberquestion" :aria-describedby="ariaDescribedby" inline name="member-radios" value="JA">Mitglied mit DVE</b-form-radio>
                  </b-form-group>
                  <b-form-group v-if="store.memberquestion === 'JA'"
                                id="input-group-membernr"
                                :state="errors.state_memberNr"
                                :invalid-feedback="errors.error_memberNr"
                                label="Mitgliedsmmer:"
                                label-class="text-black"
                                label-for="input-membernr"
                  >
                    <b-form-input
                      id="input-membernr"
                      v-model="store.memberNr"
                      @update="checkMemberNr"
                      required
                      :state="errors.state_memberNr"
                    ></b-form-input>
                  </b-form-group>
                </div>

                <div>
                  <b-form-group label="Essen Präferenz" v-slot="{ food }">
                    <b-form-radio v-model="store.food" :aria-describedby="food" inline name="food-radios" value="klassich">klassich</b-form-radio>
                    <b-form-radio v-model="store.food" :aria-describedby="food" inline name="food-radios" value="vegetarisch">vegetarisch</b-form-radio>
                    <b-form-radio v-model="store.food" :aria-describedby="food" inline name="food-radios" value="Keine">Teilnahme nich gewünscht</b-form-radio>
                  </b-form-group>
                </div>

                <b-button
                  class="custom-button float-right"
                  style="margin-bottom: 20px"
                  @click="step += 1"
                  :disabled="disableNextButton()"
                  v-b-toggle.accordion-submodel
                  variant="success"
                >
                  Next
                </b-button>

              </b-form>
            </b-card-text>
          </b-card-body>



          <b-card-body
            v-if="step ===2"
          >
            <b-card-text>
              <h4>Wählen Sie auf der linken Seite das Hauptseminar aus, an dem Sie teilnehmen möchten, auf der rechten Seite können Sie Alternativen wählen, falls Ihr Hauptseminar ausgebucht ist.</h4>
              <b-form novalidate>
                <b-group
                  v-for="slot in slot_list"
                  :key="slot.id"
                >
                  <b-card-header
                    header-tag="header"
                    style="text-align: left"
                    role="tab"
                  >
                    <h2>{{slot.title}}</h2>
                    <h5>{{slot.description}}</h5>

                  </b-card-header>

                  <b-form-checkbox-group
                    v-model="slot.check"
                  >
                    <b-form-radio-group
                      v-model="slot.radio"
                    >
                      <b-form-group
                        no-body
                        v-for="seminar in slot.seminar_list"
                        :key="seminar.key"
                        class="mb-1"
                      >

                        <b-card>
                          <div class="space-between">
                            <b-form-radio v-bind:value=seminar.id><h5>{{seminar.tag}}</h5></b-form-radio>
                            <h5>{{seminar.title}}</h5>
                            <b-form-checkbox v-bind:value=seminar.id></b-form-checkbox>
                          </div>
                        </b-card>

                      </b-form-group>
                    </b-form-radio-group>
                  </b-form-checkbox-group>
                </b-group>


                <b-button
                  class="custom-button float-right"
                  style="margin-bottom: 20px"
                  @click="submit"
                  :disabled="disableSubmitButton()"
                  v-b-toggle.accordion-submodel
                  variant="success"
                >
                  submit
                </b-button>
                <b-button
                  class="custom-button float-right"
                  style="margin-bottom: 20px"
                  @click="step -= 1"
                  :disabled="disablePreviousButton()"
                  v-b-toggle.accordion-submodel
                  variant="success"
                >
                  Previous
                </b-button>

              </b-form>
            </b-card-text>
          </b-card-body>

          <b-card-body
            v-if="step ===3"
          >
            <b-card-text>
              <h4>Registrierungsanfrage erhalten, danke</h4>
            </b-card-text>
          </b-card-body>

        </b-collapse>
      </b-card>
    </b-col>

  </b-col>
</template>

<script>
import qs from "qs";

import { Octokit } from "octokit";
import { store } from "core-js/internals/reflect-metadata";

export default {
  auth: true,
  name: "seminar",
  data() {
    return {
      slots: "",
      step: 1,
      membercondition:"",
      errors: {
        error_name: "",
        state_name: null,
        error_geb: "",
        state_geb: null,
        error_address: "",
        state_address: null,
        error_telephone: "",
        state_telephone: null,
        error_memberNr: "",
        state_memberNr: false,
        error_food: "",
        state_food: false,

      },
      store: {
        gender: "",
        name: "",
        geb: "",
        address: "",
        telephone: "",
        memberNr: "0",
        slots: "",
        food: "",
        memberquestion:"",

      },
    };
  },
  created(){
    this.getSeminars()
  },
  computed: {
    slot_list: function(){
      return this.slots;
    }
  },

  methods: {

    getSeminars(){
      this.$axios.get("/seminar/list", {}).then(
        (response) => {
          this.slots = response.data["seminar_list"];
          let slot;
          for (slot of this.slots)
            slot.check= [];
        },
        (error) => {
          console.log("error")
          /*if(error.response.status === 403 && error.response.data === "403 Forbidden") {
           this.$refs['error'].show()*/
        }
      );
    },

    checkName() {
      this.errors.error_name = "";
      if (store.name) {
        this.errors.error_name = "field erfordlich.";
        this.errors.state_name = false;
      } else {
        this.errors.state_name = true;
      }
    },
    checkGeb() {
      this.errors.error_geb = "";
      if (store.geb) {
        this.errors.error_geb = "field erfordlich.";
        this.errors.state_geb = false;
      } else {
        this.errors.state_geb = true;
      }
    },
    checkTelephone() {
      this.errors.error_telephone = "";
      if (store.telephone) {
        this.errors.error_telephone = "field erfordlich.";
        this.errors.state_telephone = false;
      } else {
        this.errors.state_telephone = true;
      }
    },
    checkAddress() {
      this.errors.error_address = "";
      if (store.address) {
        this.errors.error_address = "field erfordlich.";
        this.errors.state_address = false;
      } else {
        this.errors.state_address = true;
      }
    },
    checkMemberNr() {
      this.errors.error_memberNr = "";
      if (store.memberNr) {
        this.errors.error_memberNr = "field erfordlich.";
        this.errors.state_memberNr = false;
      } else {
        this.errors.state_memberNr = true;
      }
    },

    disableNextButton() {
      return (
        this.store.gender == "" ||
        this.store.food == "" ||
        this.store.memberquestion == "" ||
        !this.errors.state_geb ||
        !this.errors.state_address ||
        !this.errors.state_telephone ||
        !this.errors.state_name
      );
    },

    disableSubmitButton() {
      let slot;
      for (slot of this.slots)
        if (slot.radio== "")
          return (true);
      return (
        false
      );
    },
    disablePreviousButton() {
      return (
        false
      );
    },

    submit(evt) {
      this.store.slots = this.slots
      this.$axios
        .put("/seminar/register", JSON.stringify({ content: this.store }), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(

          (response) => {
            this.step = 3
            },
          (error) => {

          }
        );
    },
  },
};
</script>
<style>
.bg-gradient {
  background: linear-gradient(167deg, rgba(243,245,241,1) 0%, rgba(162,198,23,1) 65%);

  box-shadow: 0px 4px 6px 0px #cccccc;
}
.space-between {
  display: flex;
  justify-content: space-between;
}
.custom-button {
  width: 120px;
}
</style>
