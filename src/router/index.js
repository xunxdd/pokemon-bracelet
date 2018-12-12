import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PokeCollection from '@/components/PokeCollection'
import PokeCollectionEditor from '@/components/PokeCollection-Editor'
import PokeMoves from '@/components/PokeMoves'
import BraceletPowers from '@/components/BraceletPowers'
import BraceletCanHold from '@/components/BraceletCanHold'
import WishList from '@/components/WishList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/poke/:page',
      name: 'PokeCollection',
      component: PokeCollection
    },
    {
      path: '/poke-editor/:key/:page',
      name: 'PokeCollectionEditor',
      component: PokeCollectionEditor
    },
    {
      path: '/poke-editor',
      name: 'PokeCollectionAdd',
      component: PokeCollectionEditor
    },
    {
      path: '/moves',
      name: 'PokeMoves',
      component: PokeMoves
    },
    {
      path: '/braceletpowers',
      name: 'BraceletPowers',
      component: BraceletPowers
    },
    {
      path: '/braceletcanhold',
      name: 'BraceletCanHold',
      component: BraceletCanHold
    },
    {
      path: '/wishlist',
      name: 'WishList',
      component: WishList
    }
  ]
})
