import { promisify } from 'util'
import { writeFile, access, constants } from 'fs'
import chalk from 'chalk'
import { CoffeeController } from './src/CoffeeController';

import inquirer = require('inquirer')
import os = require('os');

const defaultRecipes = {
  "Latte": {
    "Water": 40,
    "Milk": 20,
    "Coffee": 20
  },
  "Black": {
    "Water": 60,
    "Milk": 0,
    "Coffee": 20
  },
  "Capucchino": {
    "Water": 30,
    "Milk": 40,
    "Coffee": 20
  },
  "Espresso": {
    "Water": 30,
    "Milk": 30,
    "Coffee": 20
  }
}

const defaultContainer = {
  "Milk": 0,
  "Water": 0,
  "Coffee": 0
}

/**
 * cli method supports async/await
 */
export const cli = async(): Promise<void> => {
  /**
   * Async writefile and file path
   */
  const writeFileAsync = promisify(writeFile)
  const accessAsync = promisify(access)
  
  const outputRecipesPath = `${os.homedir}/.Recipes.json`
  const outputContainerPath = `${os.homedir}/.Container.json`
  
  let recipes: object
  try {
    await accessAsync(outputRecipesPath, constants.F_OK)
    recipes = require(outputRecipesPath)
  } catch(err) {
    recipes = defaultRecipes
    await writeFileAsync(outputRecipesPath, JSON.stringify(recipes))
  }
  
  let container: object
  try {
    await accessAsync(outputContainerPath, constants.F_OK)
    container = require(outputContainerPath)
  } catch(err) {
    container = defaultContainer
    await writeFileAsync(outputContainerPath, JSON.stringify(container))
  }
  
  const coffeeInstance = new CoffeeController()
  
  /**
   * Inquirer question to be asked
   */
  const question: object[] = [
    {
      type: "list",
      name: "recipe",
      message: "Choose a available recipe",
      choices: Object.keys(recipes),
    }
  ]

  const argv = require('yargs')
    .usage('Usage: $0 <command> [options')
    /**
     * Command to add recipe.
     * Takes 4 arguments, name: string
     * milk: number, water: number, coffee: number
     */
    .command('add-recipe', 'Add a recipe to the list of recipes', (yargs) => {
      return yargs.option('name')
                  .option('milk')
                  .option('water')
                  .option('coffee')
    },
    async ({name, milk, water, coffee}) => {
      const newRecipeName: string = name
      const newRecipeDetails: object = {"Water": water, "Milk": milk, "Coffee": coffee}
      recipes[newRecipeName] = newRecipeDetails
      await writeFileAsync(outputRecipesPath, JSON.stringify(recipes))
      console.log(chalk.green("Recipe added"))
    })
    .command('init', 'Initialize the the ingredients of the coffee machine', (yargs) => {
      return yargs.option('milk')
                  .option('water')
                  .option('coffee')
    },
    async ({milk, water, coffee}) => {
      await coffeeInstance.initContainer({milk, water, coffee})
      console.log(chalk.green("Success"))
    })
    /**
     * Brews coffee based on the recipe provided. If no recipe provided then
     * asks the user to select one from the existing recipes.
     */
    .command('brew', 'Brew coffee', (yargs) => {
      return yargs
    },async (yargs) => {
      let name = yargs._[1]
      if(name && !recipes.hasOwnProperty(name)) {
        //throw error
        throw new Error(chalk.red("No such recipe"))
      }
      if(!name) {
        let answer = await inquirer.prompt(question)
        name = answer.recipe
      }

      await coffeeInstance.brew(recipes[name])
      
    })
    .help('h')
    .alias('h', 'help').argv
}