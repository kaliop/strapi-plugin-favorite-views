import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

const useTranslate = () => {
  const { formatMessage } = useIntl();

  const translate = (key, values) => {
    return formatMessage({ id: getTrad(key) }, values);
  };

  return {
    translate
  };
};

export default useTranslate;
