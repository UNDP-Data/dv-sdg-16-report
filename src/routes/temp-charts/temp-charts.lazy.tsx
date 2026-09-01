import { createLazyRoute } from '@tanstack/react-router';
import { ImageDownloadButton } from '@undp/data-viz/ImageDownloadButton';
import { cn } from '@undp/design-system-react/cn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@undp/design-system-react/Tabs';
import { H1 } from '@undp/design-system-react/Typography';
import { type ReactNode, useState } from 'react';
import DefenderKillingsLineChart from '@/routes/chapters/01-peace/charts/DefenderKillingsLineChart';
import DefendersKilledByGroupRegionWaffle from '@/routes/chapters/01-peace/charts/DefendersKilledByGroupRegionWaffle';
import FeelSafeWalkingAloneByPeriodDumbbellChart from '@/routes/chapters/01-peace/charts/FeelSafeWalkingAloneByPeriodDumbbellChart';
import FeelSafeWalkingAloneBySexDumbbellChart from '@/routes/chapters/01-peace/charts/FeelSafeWalkingAloneBySexDumbbellChart';
import HomicideRateByRegionBarChart from '@/routes/chapters/01-peace/charts/HomicideRateByRegionBarChart';
import HomicideRateBySexLineChart from '@/routes/chapters/01-peace/charts/HomicideRateBySexLineChart';
import IntimatePartnerHomicideByRegionSexBarChart from '@/routes/chapters/01-peace/charts/IntimatePartnerHomicideByRegionSexBarChart';
import NonLethalViolenceByTypeSexStripChart from '@/routes/chapters/01-peace/charts/NonLethalViolenceByTypeSexStripChart';
import SexualViolenceInChildhoodUnitChart from '@/routes/chapters/01-peace/charts/SexualViolenceInChildhoodUnitChart';
import TraffickingByExploitationFormDonutChart from '@/routes/chapters/01-peace/charts/TraffickingByExploitationFormDonutChart';
import TraffickingVictimsBySexAgeUnitChart from '@/routes/chapters/01-peace/charts/TraffickingVictimsBySexAgeUnitChart';
import ViolentDisciplineByRegionBarChart from '@/routes/chapters/01-peace/charts/ViolentDisciplineByRegionBarChart';
import BriberyPrevalenceStripChart from '@/routes/chapters/02-justice/charts/BriberyPrevalenceStripChart';
import BusinessBriberyStripChart from '@/routes/chapters/02-justice/charts/BusinessBriberyStripChart';
import BusinessBriberyTrendStripChart from '@/routes/chapters/02-justice/charts/BusinessBriberyTrendStripChart';
import CrimeRelatedIFFsCards from '@/routes/chapters/02-justice/charts/CrimeRelatedIFFsCards';
import DetaineesBySentencingStatusBarChart from '@/routes/chapters/02-justice/charts/DetaineesBySentencingStatusBarChart';
import DisputeResolutionAccessStripChart from '@/routes/chapters/02-justice/charts/DisputeResolutionAccessStripChart';
import FirearmsTracingBeeSwarmChart from '@/routes/chapters/02-justice/charts/FirearmsTracingBeeSwarmChart';
import NHRIComplianceChoroplethMap from '@/routes/chapters/02-justice/charts/NHRIComplianceChoroplethMap';
import TaxCommercialIFFsCards from '@/routes/chapters/02-justice/charts/TaxCommercialIFFsCards';
import UnsentencedShareBySexDumbbellChart from '@/routes/chapters/02-justice/charts/UnsentencedShareBySexDumbbellChart';
import AccessToInformationChoroplethMap from '@/routes/chapters/03-inclusion/charts/AccessToInformationChoroplethMap';
import AccessToInformationDisclosureBigNumbers from '@/routes/chapters/03-inclusion/charts/AccessToInformationDisclosureBigNumbers';
import BudgetDeviationByIncomeGroupLineChart from '@/routes/chapters/03-inclusion/charts/BudgetDeviationByIncomeGroupLineChart';
import DiscriminationRatesByGroupBarChart from '@/routes/chapters/03-inclusion/charts/DiscriminationRatesByGroupBarChart';
import GapToParityBarChart from '@/routes/chapters/03-inclusion/charts/GapToParityBarChart';
import HealthcareSatisfactionByRegionBarChart from '@/routes/chapters/03-inclusion/charts/HealthcareSatisfactionByRegionBarChart';
import ParliamentaryLeadershipByCategoryBarChart from '@/routes/chapters/03-inclusion/charts/ParliamentaryLeadershipByCategoryBarChart';
import PoliticalEfficacyByRegionBarChart from '@/routes/chapters/03-inclusion/charts/PoliticalEfficacyByRegionBarChart';
import RepresentationByInstitutionalLevelBarChart from '@/routes/chapters/03-inclusion/charts/RepresentationByInstitutionalLevelBarChart';
import SatisfactionWithPublicServicesStripChart from '@/routes/chapters/03-inclusion/charts/SatisfactionWithPublicServicesStripChart';
import VoteSharesByInstitutionDumbbellChart from '@/routes/chapters/03-inclusion/charts/VoteSharesByInstitutionDumbbellChart';
import { GraphContainer } from '@/routes/chapters/components/Containers';

const CHAPTERS = ['Peace', 'Justice', 'Inclusion'];

function ChartFrame({
  file,
  size = 'base',
  children,
}: {
  file: string;
  size?: 'base' | 'lg';
  children: ReactNode;
}) {
  const nodeId = `chart-${file}`;
  const buttonClass = 'shrink-0 cursor-pointer px-2 py-1 text-xs after:hidden';

  return (
    <section
      className={cn(
        'mx-auto w-full',
        size === 'base'
          ? 'max-w-2xl md:max-w-176 lg:max-w-180'
          : 'max-w-2xl md:max-w-240 lg:max-w-7xl',
      )}
    >
      <div className='flex justify-end gap-2'>
        <ImageDownloadButton
          nodeID={nodeId}
          filename={file}
          buttonContent='PNG'
          buttonSmall
          className={buttonClass}
        />
      </div>
      <GraphContainer id={nodeId} size={size}>
        {children}
      </GraphContainer>
    </section>
  );
}

export function TempCharts() {
  const [activeChapter, setActiveChapter] = useState('Peace');

  return (
    <section className='mx-auto w-full max-w-7xl px-6 py-12 md:px-12'>
      <H1 marginBottom='sm' className='font-normal normal-case'>
        All charts
      </H1>

      <Tabs value={activeChapter} onValueChange={setActiveChapter} color='blue'>
        <TabsList className='mb-6 flex-wrap pl-0'>
          {CHAPTERS.map((chapter) => (
            <TabsTrigger
              key={chapter}
              value={chapter}
              className='cursor-pointer text-sm normal-case md:text-base'
            >
              {chapter}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='Peace'>
          <div className='flex flex-col gap-12'>
            <ChartFrame file='DefenderKillingsLineChart'>
              <DefenderKillingsLineChart />
            </ChartFrame>
            <ChartFrame file='DefendersKilledByGroupRegionWaffle'>
              <DefendersKilledByGroupRegionWaffle />
            </ChartFrame>
            <ChartFrame file='FeelSafeWalkingAloneByPeriodDumbbellChart'>
              <FeelSafeWalkingAloneByPeriodDumbbellChart />
            </ChartFrame>
            <ChartFrame file='FeelSafeWalkingAloneBySexDumbbellChart'>
              <FeelSafeWalkingAloneBySexDumbbellChart />
            </ChartFrame>
            <ChartFrame file='HomicideRateByRegionBarChart'>
              <HomicideRateByRegionBarChart />
            </ChartFrame>
            <ChartFrame file='HomicideRateBySexLineChart'>
              <HomicideRateBySexLineChart />
            </ChartFrame>
            <ChartFrame file='IntimatePartnerHomicideByRegionSexBarChart'>
              <IntimatePartnerHomicideByRegionSexBarChart />
            </ChartFrame>
            <ChartFrame file='NonLethalViolenceByTypeSexStripChart'>
              <NonLethalViolenceByTypeSexStripChart />
            </ChartFrame>
            <ChartFrame file='SexualViolenceInChildhoodUnitChart'>
              <SexualViolenceInChildhoodUnitChart />
            </ChartFrame>
            <ChartFrame file='TraffickingByExploitationFormDonutChart'>
              <TraffickingByExploitationFormDonutChart />
            </ChartFrame>
            <ChartFrame file='TraffickingVictimsBySexAgeUnitChart'>
              <TraffickingVictimsBySexAgeUnitChart />
            </ChartFrame>
            <ChartFrame file='ViolentDisciplineByRegionBarChart'>
              <ViolentDisciplineByRegionBarChart />
            </ChartFrame>
          </div>
        </TabsContent>

        <TabsContent value='Justice'>
          <div className='flex flex-col gap-12'>
            <ChartFrame file='BriberyPrevalenceStripChart'>
              <BriberyPrevalenceStripChart />
            </ChartFrame>
            <ChartFrame file='BusinessBriberyStripChart'>
              <BusinessBriberyStripChart />
            </ChartFrame>
            <ChartFrame file='BusinessBriberyTrendStripChart'>
              <BusinessBriberyTrendStripChart />
            </ChartFrame>
            <ChartFrame file='CrimeRelatedIFFsCards'>
              <CrimeRelatedIFFsCards />
            </ChartFrame>
            <ChartFrame file='DetaineesBySentencingStatusBarChart'>
              <DetaineesBySentencingStatusBarChart />
            </ChartFrame>
            <ChartFrame file='DisputeResolutionAccessStripChart'>
              <DisputeResolutionAccessStripChart />
            </ChartFrame>
            <ChartFrame file='FirearmsTracingBeeSwarmChart'>
              <FirearmsTracingBeeSwarmChart />
            </ChartFrame>
            <ChartFrame file='NHRIComplianceChoroplethMap' size='lg'>
              <NHRIComplianceChoroplethMap />
            </ChartFrame>
            <ChartFrame file='TaxCommercialIFFsCards'>
              <TaxCommercialIFFsCards />
            </ChartFrame>
            <ChartFrame file='UnsentencedShareBySexDumbbellChart'>
              <UnsentencedShareBySexDumbbellChart />
            </ChartFrame>
          </div>
        </TabsContent>

        <TabsContent value='Inclusion'>
          <div className='flex flex-col gap-12'>
            <ChartFrame file='AccessToInformationChoroplethMap' size='lg'>
              <AccessToInformationChoroplethMap />
            </ChartFrame>
            <ChartFrame file='AccessToInformationDisclosureBigNumbers'>
              <AccessToInformationDisclosureBigNumbers />
            </ChartFrame>
            <ChartFrame file='BudgetDeviationByIncomeGroupLineChart'>
              <BudgetDeviationByIncomeGroupLineChart />
            </ChartFrame>
            <ChartFrame file='DiscriminationRatesByGroupBarChart'>
              <DiscriminationRatesByGroupBarChart />
            </ChartFrame>
            <ChartFrame file='GapToParityBarChart'>
              <GapToParityBarChart />
            </ChartFrame>
            <ChartFrame file='HealthcareSatisfactionByRegionBarChart'>
              <HealthcareSatisfactionByRegionBarChart />
            </ChartFrame>
            <ChartFrame file='ParliamentaryLeadershipByCategoryBarChart'>
              <ParliamentaryLeadershipByCategoryBarChart />
            </ChartFrame>
            <ChartFrame file='PoliticalEfficacyByRegionBarChart'>
              <PoliticalEfficacyByRegionBarChart />
            </ChartFrame>
            <ChartFrame file='RepresentationByInstitutionalLevelBarChart'>
              <RepresentationByInstitutionalLevelBarChart />
            </ChartFrame>
            <ChartFrame file='SatisfactionWithPublicServicesStripChart'>
              <SatisfactionWithPublicServicesStripChart />
            </ChartFrame>
            <ChartFrame file='VoteSharesByInstitutionDumbbellChart'>
              <VoteSharesByInstitutionDumbbellChart />
            </ChartFrame>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export const Route = createLazyRoute('/temp/charts')({
  component: TempCharts,
});
