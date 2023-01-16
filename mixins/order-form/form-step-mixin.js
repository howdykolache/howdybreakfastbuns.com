import { mapGetters, mapActions } from "vuex";
import { persistentformData } from '@/helpers/order-form-persistence'

export default {
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
    inEditMode(){
      return this.$route.query.editing && 
      this.$route.query.editing == '1'
    }
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onChange() {
      this.update(this.dataToCommit);
    },
    next() {
      let route = this.nextStepRoute
      // Redirect back to the specified page when done editing
      if(this.inEditMode && this.$route.query.next) {
        route = this.$route.query.next
      }

      this.$router.push(route);
    },
  },
  mounted() {
    // Retrieve previously saved form data from the local storage
    const formDataFromLocalStorage = persistentformData.get()
    // If there’s indeed previous values, overwrite current store with these values 
    if (formDataFromLocalStorage) {
      // Note: this will only overwrite state.fields properly, the rest of the state won;t be affected 
      this.update(formDataFromLocalStorage.data);
    }
  },
  watch: {
    'form': {
      // Whenever the “this.form” value changes 
      // (which maps to the “fields” property in order-form.js’s state)
      handler: function (newValue) {
        // Save the new value in local storage
        persistentformData.set(newValue)
      },
      deep: true
    }
  }
};
