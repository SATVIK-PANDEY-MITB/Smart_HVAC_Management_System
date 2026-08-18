from pydantic import BaseModel


class FaultPredictionRequest(BaseModel):

    RTU_COMP_WATT: float
    RTU_OA_FLOW: float
    RTU_OA_HUM: float
    RTU_OA_TEMP: float
    RTU_RA_FLOW: float
    RTU_RA_HUM: float
    RTU_RA_TEMP: float
    RTU_REFG_COND_PRES: float
    RTU_REFG_COND_TEMP: float
    RTU_REFG_DISC_PRES: float
    RTU_REFG_DISC_TEMP: float
    RTU_REFG_SUCT_PRES: float
    RTU_REFG_SUCT_TEMP: float
    RTU_SA_FAN_WATT: float
    RTU_SA_FLOW: float
    RTU_SA_HUM: float
    RTU_SA_TEMP: float
    RTU_SEN_CAPA: float
    RTU_STG_STA: float
    RTU_TOT_CAPA: float
    RTU_TOT_WATT: float
    ZA_HUM: float
    ZA_TEMP: float



class EnergyPredictionRequest(BaseModel):

    building_id: str
    site_id: str

    building_id_kaggle: int
    site_id_kaggle: int

    primaryspaceusage: str
    sub_primaryspaceusage: str

    sqm: float
    sqft: float

    lat: float
    lng: float

    timezone: str
    electricity: str

    airTemperature: float
    dewTemperature: float
    precipDepth1HR: float
    seaLvlPressure: float
    windDirection: float
    windSpeed: float

    hour: int
    day: int
    month: int
    day_of_week: int
    week_of_year: int
    is_weekend: int