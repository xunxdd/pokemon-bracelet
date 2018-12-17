import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PokeCollection from '@/components/PokeCollection'
import PokeCollectionFiltered from '@/components/PokeCollectionFiltered'
import PokeCollectionEditor from '@/components/PokeCollection-Editor'
import PokeStatCard from '@/components/PokeStatCard'
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
      path: '/pokefiltered/:query',
      name: 'PokeCollectionFiltered',
      component: PokeCollectionFiltered
    },
    {
      path: '/poke-editor/:key',
      name: 'PokeCollectionEditor',
      component: PokeCollectionEditor
    },
    {
      path: '/pokecard/:key',
      name: 'PokeStatCard',
      component: PokeStatCard
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
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
