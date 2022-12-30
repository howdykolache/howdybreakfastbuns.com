import { mapGetters, mapActions } from "vuex";

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
      // Redirect back to review page when editing
      if(this.inEditMode) route = "/order/direct/form/review"

      this.$router.push(route);
    },
  }
};
