param([int]$Columns = 4, [int]$Rows = 3, [int]$CellWidth = 360, [int]$CellHeight = 440)
Add-Type -AssemblyName System.Drawing
$repo = Resolve-Path (Join-Path $PSScriptRoot '..\..\..')
$art = Join-Path $repo 'library\the-picture-of-dorian-gray\art\generated'
$output = Join-Path $PSScriptRoot 'contact-sheets'
New-Item -ItemType Directory -Force -Path $output | Out-Null
function New-Sheet {
  param([string]$Name, [System.IO.FileInfo[]]$Files)
  $pageSize = $Columns * $Rows
  for ($offset = 0; $offset -lt $Files.Count; $offset += $pageSize) {
    $page = [int][Math]::Floor($offset / $pageSize) + 1
    $canvas = [System.Drawing.Bitmap]::new($Columns * $CellWidth, $Rows * $CellHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    $graphics.Clear([System.Drawing.Color]::FromArgb(28, 24, 22))
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $font = [System.Drawing.Font]::new('Segoe UI', 14, [System.Drawing.FontStyle]::Bold)
    for ($index = 0; $index -lt $pageSize -and ($offset + $index) -lt $Files.Count; $index++) {
      $file = $Files[$offset + $index]; $col = $index % $Columns
      $row = [int][Math]::Floor($index / $Columns)
      $image = [System.Drawing.Image]::FromFile($file.FullName)
      $scale = [Math]::Min(($CellWidth - 16) / $image.Width, ($CellHeight - 58) / $image.Height)
      $width = [int]($image.Width * $scale); $height = [int]($image.Height * $scale)
      $x = $col * $CellWidth + [int](($CellWidth - $width) / 2); $y = $row * $CellHeight + 8
      $graphics.DrawImage($image, $x, $y, $width, $height)
      $graphics.DrawString($file.BaseName, $font, [System.Drawing.Brushes]::White, $col * $CellWidth + 8, ($row + 1) * $CellHeight - 34)
      $image.Dispose()
    }
    $path = Join-Path $output ("{0}-{1:D2}.jpg" -f $Name, $page)
    $canvas.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $font.Dispose(); $graphics.Dispose(); $canvas.Dispose(); Write-Output $path
  }
}
New-Sheet -Name 'cover' -Files @(Get-Item (Join-Path $art 'cover.png'))
New-Sheet -Name 'characters' -Files @(Get-ChildItem (Join-Path $art 'characters') -Filter '*.png' | Sort-Object Name)
New-Sheet -Name 'items' -Files @(Get-ChildItem (Join-Path $art 'items') -Filter '*.png' | Sort-Object Name)
New-Sheet -Name 'locations' -Files @(Get-ChildItem (Join-Path $art 'locations') -Filter '*.png' | Sort-Object Name)
