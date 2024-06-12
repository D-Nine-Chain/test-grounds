from enum import Enum
from scalecodec import ScaleType

class CurrencyDecimals(Enum):
	D9 = 12
	USDT = 2

def to_decimal(decimal_enum:CurrencyDecimals, value:ScaleType):
	"""
	converts value to decimal based on currency
	Args:
		decimal_enum (CurrencyDecimals): currency enum
		value (int): value to convert
	"""
	print("value is ", value)
	decoded_value = value.decode()
	if isinstance(decoded_value, int):
		return decoded_value / 10 ** decimal_enum.value
	else:
		return 0
