<template>
    <div>
        <button @click="persistData()">Save</button>
        <a href="?data=N4IgbgpgTgzglgewHYgFwAYB0BGANCAEwEMAXItUAByKhLgGM5qkSYKRt24C08QkiAWwhoQAIQQBXEnQA20EAF98AJi49UK-AOGiAWpIBmhqBACeS-AGZ1aK9qEjUIAILyAHpZAAWW6m8Ous4AyhAARl4ArH6RgU4gACJCcBAoyiAAbH4ZcaIAYlBESADWXgDsfmW5zmKpXgAcfvXVIADCAJcEUAxeAJx+vS3BZrJgRHBp+NjoftMtSWDcSukA5lBSlGyooJzbIEuofDrxAAo09F5qewda-I6irUKUEyteNtca9ndBIADiskR6BAYAB6MRwAAXpjY6V8HzQAW+8VaUlgIkU6Qg7koqRgwPYu1ABz4QikLF4zRA1FoDCYRRIaEpaw2vBaLkolAQEwZ6SuRI0t1JknJmnqgypNDojGYDMO6HwzMklFZSNEAFEWFB2hAAAQEXVhIh4t5+L5CkVleUSmnS+kqxXKzQtS1eOH8hH4c2y6ZW6lSukixEOtC3Y6iH1RGKewRk73oX2S2kyuwK9ZKkMtCPpLLw1A5EBe3jx-B+pN21Di4NO1XOLP4Cq5qoFmPC72U0u2kV8KtfMPOBpNaOxtCWkuJzuyoNpx29+799L9XPiwuaREdgNx1Ms1Czn5eaazK0rqz1Jvr5OoJtVxF9kDLDFAA">
            Load demo...
        </a>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    methods: {
      persistData() {
        this.$store.dispatch('persistData');
        window.location = '?data=' + this.queryString;
      },
    },
    computed: {
      ...mapState(['queryString']),
    },
  }
</script>
