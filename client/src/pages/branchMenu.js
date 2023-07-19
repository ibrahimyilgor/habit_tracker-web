import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import MenuForCustomers from 'src/components/menu-for-customers';

const BranchMenu = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const [menu, setMenu] = useState([]);
  const [isPdf, setIsPdf] = useState(false);
  const [settings, setSettings] = useState({})
  const [colors, setColors] = useState({})
  const [pdfPreview, setPdfPreview] = useState('');
  const [file, setFile] = useState();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPdfPreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPdfPreview('');
    }
  }, [file]);

  useEffect(() => {
    const fetchData = async () => {
      const menuResponse = await fetch(`http://localhost:3001/restaurant/${id}/getMenuForCustomers`, {
        method: 'GET',
      });
      const tempMenu = await menuResponse.json();

      console.log('tempMenu', tempMenu, tempMenu?.[0].menu || []);

      const response = await fetch(`http://localhost:3001/pdfMenu/${id}`, {
        method: 'GET',
      });

      if (response.ok) {
        console.log('response', response);
        const blob = await response.blob();
        const file = new File([blob], 'fileName', { type: 'application/pdf' });
        setFile(file);
      } else {
        console.error('Failed to fetch PDF:', response.statusText);
        setFile(null);
      }

      setMenu(tempMenu?.[0].menu || []);
      setSettings(tempMenu?.[0].settings || {});
      setColors(tempMenu?.[0].colors || {})
      setIsPdf(tempMenu?.[0]?.isPdf);
    };

    fetchData().catch(console.error);
  }, [id]);

  useEffect(() => {
    menu && menu.length > 0 && menu.map((m) => {
      console.log('menu,', m.name);
    });
  }, [menu]);

  return (
    <Box sx={{backgroundColor: colors?.backgroundColor ?? "#ffffff", height: "100vh"}}>
      <Head>
        <title>Branches | Devias Kit</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Stack spacing={3}>
          <Stack direction="column" justifyContent="space-between" spacing={4}>
            {!isPdf && <MenuForCustomers menu={menu} settings={settings} colors={colors} />}

            {isPdf && (
              <iframe
                src={pdfPreview ? pdfPreview + '#toolbar=0&navpanes=0&view=fitH' : pdfPreview}
                title="PDF Preview"
                style={{ width: '100vw', height: "100vh" }}
                frameborder="0"
              ></iframe>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

BranchMenu.getLayout = (branchMenu) => <DashboardLayout>{branchMenu}</DashboardLayout>;

export default BranchMenu;
