import { useContext } from 'react'
import '../../common/scss/pages/settings.scss'
import DefaultTheme from '../../assets/images/default-theme.png'
import DarkTheme from '../../assets/images/dark-theme.png'
import { ThemeContext } from '../../context/Theme.context'

function ChangeTheme () {
  const { setLightTheme, setDarkTheme, theme  } = useContext(ThemeContext)
  return (
    <>
      <div className='changetheme-section'>
        <div className='section-title'><h6>Theme</h6></div>
        <form>
          <div className='flex-box'>
            <div className='flex-item change-default'>
              <div className='form-field' onClick={setLightTheme}>
                <input type='radio' name='theme' id='default_theme' checked={theme?.dark ?  "" :"true" } />
                <label htmlFor='default_theme'>
                  <img src={DefaultTheme} alt='default-theme' />
                  <div className='button'>Light</div>
                </label>
              </div>
            </div>
            <div className='flex-item change-dark'>
              <div className='form-field' onClick={setDarkTheme}>
                <input type='radio' name='theme' id='dark_theme' checked={theme?.dark ?  "true" :"" } />
                <label htmlFor='dark_theme'>
                  <img src={DarkTheme} alt='dark-theme' />
                  <div className='button'>Dark</div>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ChangeTheme
