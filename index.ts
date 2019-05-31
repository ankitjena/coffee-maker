#! /usr/bin/env node
import { promisify } from 'util'
import { writeFile } from 'fs'
import chalk from 'chalk'
import { CoffeeController } from './src/CoffeeController';

const inquirer = require('inquirer')

/**
 * cli method supports async/await
 */
const cli = async(): Promise<void> => {
  /**
   * Async writefile and file path
   */
  const writeFileAsync = promisify(writeFile)
  const recipesPath = `${process.cwd()}/src/Recipes.json`

  const recipes: object = require('./src/Recipes.json')
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
      await writeFileAsync(recipesPath, JSON.stringify(recipes, undefined, 2))
      console.log(chalk.green("Recipe added"))
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

      const coffeeInstance = new CoffeeController()
      coffeeInstance.init({milk: 200, water: 300, coffee: 100})
      await coffeeInstance.brew(recipes[name])
      
    })
    .help('h')
    .alias('h', 'help').argv
}
cli()