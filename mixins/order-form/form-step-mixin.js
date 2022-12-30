import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      form: "order-form/fields",
    }),
  },
  methods: {
    ...mapActions({
      update: "order-form/update",
    }),
    onChange() {
      this.update(this.dataToCommit);
    },
    next() {
      this.$router.push(this.nextStepRoute);
    },
  }
};
