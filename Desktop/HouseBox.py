#!/usr/bin/env python

"""HouseBox: A toolbox to make life easier for future property owners"""
__author__ = "Julien Beaudaux"
__version__ = "0.1"
__email__ = "julienbeaudaux@gmail.com"

# import sys, os, serial, time
import sys
from configparser import SafeConfigParser
import matplotlib.pyplot as plt
from termcolor import colored, cprint

class RentBuyComparator(object):

	configInfos = ""

	usePeriod = 0

	rentMonthly = 0
	rentCharges = 0
	rentHousingTax = 0

	buyAmount = 0
	buyProvision = 0
	buyNotaryFees = 0.0
	buyPropeTax = 0
	buyHousingTax = 0



	def compare(self, extra, option=0):
		config = SafeConfigParser()
		config.read("config.data")

		if self.configInfos == "":
			contentToRead = "default"
		else:
			contentToRead = self.batFile

		# Get global parameters
		self.usePeriod   = int(config.get(contentToRead, "usePeriod"))

		# Get renting parameters
		self.rentMonthly = int(config.get(contentToRead, "rentMonthly"))
		self.rentCharges = int(config.get(contentToRead, "rentCharges"))
		self.rentHousingTax = int(config.get(contentToRead, "rentHousingTax"))

		# print("Renting parameters : %d \n"%(int(rentMonthly)))

		# Get owning parameters
		self.buyAmount   = int(config.get(contentToRead, "buyAmount"))       # Price of the property to buy
		buyLoanRate   = config.get(contentToRead, "buyLoanRate")     # Loan rate
		buyLoanInsu   = config.get(contentToRead, "buyLoanInsu")     # Loan inusrrance, yearly
		self.buyPropeTax   = int(config.get(contentToRead, "buyPropeTax"))     # Property tax, yearly
		self.buyHousingTax = int(config.get(contentToRead, "buyHousingTax"))     # Housing tax, yearly
		buyLoanLength = config.get(contentToRead, "buyLoanLength")   # Extent of the loan
		self.buyNotaryFees = float(config.get(contentToRead, "buyNotaryFees"))   # Notary fees, in percertage of the property value
		self.buyProvision  = int(config.get(contentToRead, "buyProvision"))    # Initial buyer's provision
		self.buyMaintFees  = int(config.get(contentToRead, "buyMaintFees"))    # Property maintenance fees

		# print("Owning parameters : %d ;; %f ;; %d ;; %d ;; %d \n"%(int(buyAmount), float(buyLoanRate), int(buyLoanInsu), int(buyPropeTax), int(buyLoanLength)))

		renting = self.rentingData()
		buying  = self.buyingData(float(buyLoanRate), int(buyLoanInsu), int(buyLoanLength))

		# self.plotData(renting, buying, int(buyLoanLength))


	def rentingData(self):
		"""
			Computes the amount of money spent -- lost -- over property renting.

			Computes the amount of money spent on property renting, to be later compared with overhead of property owning.
		"""

		rentDataAcc = []
		val = 0

		mensual = self.rentMonthly + self.rentCharges
		annual  = self.buyHousingTax

		print(colored("\n Cout annuel a la location", "blue"))
		print(colored("\t Taxes d'habitation : - %de"%(self.buyHousingTax), "blue"))
		print(colored("\t TOTAL              : - %de \n"%(annual), "green"))

		for i in range(1, self.usePeriod*12):
			rentDataAcc.append(val)
			val += (mensual)

			if i%12 == 0:
				val += 0

		print(colored("\n Cout mensuel a la location", "blue"))
		print(colored("\t Loyer mensuel      : - %de"%(self.rentMonthly), "blue"))
		print(colored("\t Charges mensuelles : - %de"%(self.rentCharges), "blue"))
		print(colored("\t TOTAL              : - %de \n"%(mensual), "green"))


		return rentDataAcc


	def buyingData(self, loanRate, Insurrence, loanLen):
		"""
			Computes the amount of money spent -- lost -- over property buying.

			Computes the amount of money spent on property buying : taxes, loan interests and insurrance, ...
		"""

		# Initial 
		notary = (self.buyNotaryFees * self.buyAmount) / 100

		initial = self.buyAmount - self.buyProvision + ((self.buyNotaryFees * self.buyAmount) / 100)

		print(colored("\n Cout initial a l'achat", "yellow"))
		print(colored("\t Prix du bien       : - %de"%(self.buyAmount), "yellow"))
		print(colored("\t Apport             : + %de"%(self.buyProvision), "yellow"))
		print(colored("\t Frais de notaire   : - %de (%dpc)"%(((self.buyNotaryFees * self.buyAmount) / 100), self.buyNotaryFees), "yellow"))
		print(colored("\t TOTAL              : - %de \n"%(initial), "green"))


		# Annual
		annual = self.buyPropeTax + self.buyHousingTax + self.buyMaintFees

		print(colored("\n Cout annuel a l'achat", "yellow"))
		print(colored("\t Taxe d'habitation  : - %de"%(self.buyHousingTax), "yellow"))
		print(colored("\t Taxe fonciere      : - %de"%(self.buyPropeTax), "yellow"))
		print(colored("\t Entretien          : - %de"%(self.buyMaintFees), "yellow"))
		print(colored("\t TOTAL              : - %de \n"%(annual), "green"))

		


		# XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX #

		"""
		Use web form :
		https://learnpythonthehardway.org/book/ex51.html
		https://learnpythonthehardway.org/book/ex50.html
		"""

		interests = []
		# (33500 * 8.12/100)/12

		buyDataAcc = []
		increment = 0

		mensualAmount = ((self.buyAmount - self.buyProvision) * (loanRate / 100) * (1 + (loanRate / 100))**(loanLen))
		# mensualAmount = mensualAmount / ((1 + ((loanRate / 100))**(loanLen)) - 1)

		remainingAmount = self.buyAmount - self.buyProvision

		tmp = 0
		for i in range(0, loanLen):
			tmp = remainingAmount * (loanRate / 100)
			interests.append(tmp)
			remainingAmount = remainingAmount - (mensualAmount - tmp)

			# print("Year %d : Remaining %d \n"%(i, remainingAmount))
			# print("Year %d : Interest %d over %d \n"%(i, tmp, mensualAmount))

			increment += tmp
			increment += annual
			# increment += mensualAmount

			buyDataAcc.append(increment)

		print(colored("\n Cout mensuel a l'achat", "yellow"))
		print(colored("\t Echeance pret      : - %de"%(mensualAmount / 12), "yellow"))
		print(colored("\t Assurrance pret    : - XXe", "yellow"))

		return buyDataAcc


	def compRentBuy(buyData, rentData):
		for i in range(0, rentBuyLen):
			pass


	def plotData(self, rentData, buyData, rentBuyLen):
		XAxis = range(0, rentBuyLen)

		for i in range(0, rentBuyLen):
			if buyData[i] < rentData[i]:
				print("Optimal = %d years"%(i))
				break

		plt.plot(XAxis, rentData, 'blue', linewidth=1, label="Renting")
		plt.plot(XAxis, buyData, 'red', linewidth=1, label="Buying overhead")

		plt.xlabel('Time (years)')
		plt.ylabel('Amount of money (Euros)')
		plt.legend(loc='lower right', prop={'size': 10})

		# axes.set_xlim([0, cardbinLOD])
		# axes.set_ylim([0, 250])

		plt.savefig('result.eps', format='eps', dpi=1000)
		plt.savefig('result.png', format='png', dpi=1000)


if __name__ == '__main__':
	myComparator = RentBuyComparator()
	if len(sys.argv) < 1:
		print 'Usage: python %s mode [options]'%(sys.argv[0])
		sys.exit(-1)

	myComparator.compare(sys.argv[1:])
